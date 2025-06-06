import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const SHOP = process.env.SHOPIFY_TEMP_SHOPNAME;
const ACCESS_TOKEN = process.env.SHOPIFY_TEMP_TOKEN;

const shopifyFetch = async (query) => {
  const response = await fetch(`https://${SHOP}.myshopify.com/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  if (json.errors) {
    console.error("Shopify API Errors:", JSON.stringify(json.errors, null, 2));
  }
  return json;
};

const countItems = async (queryName) => {
  let hasNextPage = true;
  let cursor = null;
  let count = 0;

  while (hasNextPage) {
    const query = `
      {
        ${queryName}(first: 100${cursor ? `, after: "${cursor}"` : ''}) {
          edges {
            cursor
            node { id }
          }
          pageInfo { hasNextPage }
        }
      }
    `;

    const data = await shopifyFetch(query);
    const edges = data?.data?.[queryName]?.edges || [];
    count += edges.length;
    hasNextPage = data?.data?.[queryName]?.pageInfo?.hasNextPage;
    if (hasNextPage) {
      cursor = edges[edges.length - 1].cursor;
    }
  }

  return count;
};

// Updated getDashboardData function
export const getDashboardData = async (req, res) => {
  try {
    const { range = '7d' } = req.query;

    const now = new Date();
    let startDate;

    switch (range) {
      case '1d':
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case '1m':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case '1y':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case '7d':
      default:
        startDate = new Date(now.setDate(now.getDate() - 7));
    }

    const startISO = new Date(startDate.setUTCHours(0, 0, 0, 0)).toISOString();
    const todayISO = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();

    const ordersQuery = `
      {
        orders(first: 250, query: "created_at:>=${startISO}") {
          edges {
            node {
              id
              createdAt
              totalPriceSet {
                shopMoney {
                  amount
                }
              }
            }
          }
        }
      }
    `;

    const ordersRes = await shopifyFetch(ordersQuery);
    const orders = ordersRes?.data?.orders?.edges || [];

    const orderTodayCount = orders.filter(order => order.node.createdAt >= todayISO).length;

    const groupedData = {};
    orders.forEach(({ node }) => {
      const date = new Date(node.createdAt).toISOString().split('T')[0];
      const amount = parseFloat(node.totalPriceSet.shopMoney.amount || 0);

      if (!groupedData[date]) {
        groupedData[date] = { orders: 0, revenue: 0 };
      }

      groupedData[date].orders += 1;
      groupedData[date].revenue += amount;
    });

    const dayWiseData = Object.entries(groupedData)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, data]) => {
        const sessions = 1000; // Dummy session count
        const conversionRate = ((data.orders / sessions) * 100).toFixed(2);
        return {
          date,
          orders: data.orders,
          revenue: parseFloat(data.revenue.toFixed(2)),
          conversionRate: `${conversionRate}%`
        };
      });

    // Additional counts
    const totalOrderCount = await countItems("orders");
    const productCount = await countItems("products");
    const customerCount = await countItems("customers");

    res.json({
      success: true,
      orderTodayCount,
      totalOrderCount,
      productCount,
      customerCount,
      dayWiseData
    });

  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error.message);
    res.status(500).json({
      error: "Failed to fetch dashboard data",
      details: error.message
    });
  }
}; 
 
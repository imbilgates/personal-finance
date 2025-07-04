import dbConnect from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function GET() {
  await dbConnect();
  const budgets = await Budget.find().sort({ createdAt: -1 });
  return Response.json(budgets);
}

export async function POST(request) {
  await dbConnect();
  const { category, amount, month } = await request.json();

  if (!category || !amount || !month) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  const existing = await Budget.findOne({ category, month });
  if (existing) {
    return new Response(JSON.stringify({ error: "Budget already set for this category and month." }), { status: 409 });
  }

  const budget = await Budget.create({ category, amount, month });
  return Response.json(budget);
}

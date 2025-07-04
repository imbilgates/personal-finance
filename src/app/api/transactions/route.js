import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  return Response.json(transactions);
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();

  if (!data.amount || !data.description || !data.date) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  const transaction = await Transaction.create({
    amount: data.amount,
    description: data.description,
    date: data.date,
    category: data.category || "Other",
  });

  return Response.json(transaction);
}

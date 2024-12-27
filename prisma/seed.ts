import db from "./../src/db";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("adminpassword", 10);
  await db.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@example.com",
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

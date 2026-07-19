const bcrypt = require('bcryptjs');

async function main() {
  const passwords = [
    { label: 'Admin 1 (Sumanta Sir)', password: 'Sumanta123@tat.tekkzy.com' },
    { label: 'Admin 2 (Others)', password: 'Admin2@tat.tekkzy.com' },
  ];

  for (const { label, password } of passwords) {
    const hash = await bcrypt.hash(password, 12);
    console.log(`\n${label}:`);
    console.log(`  Password: ${password}`);
    console.log(`  Hash:     ${hash}`);
  }
}

main();

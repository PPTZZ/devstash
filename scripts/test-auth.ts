import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { db } from '../lib/db';

async function testAuth() {
  console.log('🔐 Testing Credentials authentication and user registration...\n');

  try {
    // 1. Verify Demo User exists and password hash matches
    const demoUser = await db.user.findUnique({
      where: { email: 'demo@devstash.io' },
    });

    if (!demoUser || !demoUser.passwordHash) {
      throw new Error('Demo user not found or has no passwordHash');
    }

    const isDemoValid = await bcrypt.compare('12345678', demoUser.passwordHash);
    const isWrongInvalid = await bcrypt.compare('wrongpassword', demoUser.passwordHash);

    if (!isDemoValid || isWrongInvalid) {
      throw new Error('Password verification logic failed');
    }
    console.log('✅ Demo user password verification: PASSED');

    // 2. Test registration simulation
    const testEmail = 'auth-test-' + Date.now() + '@devstash.io';
    const testPassword = 'SecurePassword123!';
    const passwordHash = await bcrypt.hash(testPassword, 12);

    const newUser = await db.user.create({
      data: {
        name: 'Auth Test User',
        email: testEmail,
        passwordHash,
      },
    });
    console.log(`✅ Created test user: ${newUser.email}`);

    // Verify authentication against new user
    const isNewValid = await bcrypt.compare(testPassword, newUser.passwordHash!);
    if (!isNewValid) {
      throw new Error('New user password comparison failed');
    }
    console.log('✅ New user password verification: PASSED');

    // 3. Clean up test user
    await db.user.delete({
      where: { id: newUser.id },
    });
    console.log(`✅ Cleaned up test user: ${testEmail}`);

    console.log('\n🎉 Auth credentials test completed successfully!');
  } catch (error) {
    console.error('❌ Auth credentials test failed:', error);
    process.exit(1);
  }
}

testAuth();

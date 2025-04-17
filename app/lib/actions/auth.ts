// This is a model refered to by ChatGPT when I sought to complete all
// credentials. Inthe end, I think implementing this on one's own is a mistake
// and recipe for hackers. etter to employ a low cost but industry leading form,
// such as Cognito, augmented with a variety of Federated providers.
// RJD 4/17/2025

// 'use server';
//
// import { revalidatePath } from 'next/cache';
// import bcrypt from 'bcryptjs';
// import db from '../db';
// import { auth } from '@/auth'; // your next-auth config

// export async function registerUser(formData: FormData) {
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;

//   const existingUser = await db.user.findUnique({ where: { email } });
//   if (existingUser) throw new Error('User already exists');

//   const hashedPassword = await bcrypt.hash(password, 10);
//   await db.user.create({ data: { email, password: hashedPassword } });

//   revalidatePath('/');
// }

// export async function changePassword(formData: FormData) {
//   const session = await auth();
//   if (!session?.user?.email) throw new Error('Not authenticated');

//   const oldPassword = formData.get('oldPassword') as string;
//   const newPassword = formData.get('newPassword') as string;

//   const user = await db.user.findUnique({ where: { email: session.user.email } });
//   if (!user) throw new Error('User not found');

//   const isValid = await bcrypt.compare(oldPassword, user.password);
//   if (!isValid) throw new Error('Old password is incorrect');

//   const hashed = await bcrypt.hash(newPassword, 10);
//   await db.user.update({
//     where: { email: session.user.email },
//     data: { password: hashed },
//   });
// }

// export async function deleteAccount() {
//   const session = await auth();
//   if (!session?.user?.email) throw new Error('Not authenticated');

//   await db.user.delete({ where: { email: session.user.email } });
// }

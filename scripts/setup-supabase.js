#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up Supabase for DaVinci Coder Club...')

// Check if Supabase CLI is installed
try {
  execSync('supabase --version', { stdio: 'ignore' })
  console.log('✅ Supabase CLI is already installed')
} catch (error) {
  console.log('📦 Installing Supabase CLI...')
  try {
    execSync('npm install -g supabase', { stdio: 'inherit' })
    console.log('✅ Supabase CLI installed successfully')
  } catch (installError) {
    console.error('❌ Failed to install Supabase CLI')
    console.error('Please install it manually: https://supabase.com/docs/guides/cli')
    process.exit(1)
  }
}

// Initialize Supabase if not already initialized
if (!fs.existsSync(path.join(process.cwd(), 'supabase'))) {
  console.log('🔧 Initializing Supabase project...')
  try {
    execSync('supabase init', { stdio: 'inherit' })
    console.log('✅ Supabase project initialized')
  } catch (error) {
    console.error('❌ Failed to initialize Supabase project')
    process.exit(1)
  }
}

// Start Supabase services
console.log('🚀 Starting Supabase services...')
try {
  execSync('supabase start', { stdio: 'inherit' })
  console.log('✅ Supabase services started successfully')
} catch (error) {
  console.error('❌ Failed to start Supabase services')
  console.error('Please check if Docker is running and try again')
  process.exit(1)
}

// Generate types
console.log('📝 Generating TypeScript types...')
try {
  execSync('npm run supabase:gen-types', { stdio: 'inherit' })
  console.log('✅ TypeScript types generated')
} catch (error) {
  console.error('❌ Failed to generate types')
  console.error('You can run this manually later: npm run supabase:gen-types')
}

console.log('\n🎉 Supabase setup completed successfully!')
console.log('\n📋 Next steps:')
console.log('1. Copy the environment variables from the output above')
console.log('2. Create a .env.local file with your Supabase credentials')
console.log('3. Run "npm run dev" to start the development server')
console.log('4. Press Ctrl+Alt+A to open the admin panel')
console.log('\n🔗 Useful links:')
console.log('- Supabase Dashboard: http://localhost:54323')
console.log('- API Documentation: http://localhost:54321')
console.log('- Database: postgresql://postgres:postgres@localhost:54322/postgres') 
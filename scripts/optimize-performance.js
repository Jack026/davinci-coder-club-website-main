#!/usr/bin/env node

/**
 * Performance Optimization Script
 * Analyzes and optimizes the Da Vinci Coder Club website performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Performance Optimization Analysis...\n');

// Performance optimization checklist
const optimizations = {
  images: {
    status: 'pending',
    description: 'Optimize images for web',
    actions: [
      'Convert images to WebP format',
      'Implement responsive images',
      'Add lazy loading',
      'Use Next.js Image component'
    ]
  },
  fonts: {
    status: 'pending',
    description: 'Optimize font loading',
    actions: [
      'Preload critical fonts',
      'Use font-display: swap',
      'Subset fonts for required characters',
      'Implement font loading strategy'
    ]
  },
  css: {
    status: 'pending',
    description: 'Optimize CSS delivery',
    actions: [
      'Purge unused CSS',
      'Minify CSS',
      'Inline critical CSS',
      'Defer non-critical CSS'
    ]
  },
  javascript: {
    status: 'pending',
    description: 'Optimize JavaScript',
    actions: [
      'Code splitting',
      'Tree shaking',
      'Minify JavaScript',
      'Lazy load components'
    ]
  },
  caching: {
    status: 'pending',
    description: 'Implement caching strategy',
    actions: [
      'Set up service worker',
      'Configure CDN caching',
      'Implement browser caching',
      'Cache API responses'
    ]
  },
  compression: {
    status: 'pending',
    description: 'Enable compression',
    actions: [
      'Enable Gzip compression',
      'Enable Brotli compression',
      'Compress images',
      'Minify HTML'
    ]
  }
};

// Check if Next.js is installed
function checkNextJS() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.dependencies && packageJson.dependencies.next;
  } catch (error) {
    return false;
  }
}

// Check if Tailwind CSS is installed
function checkTailwind() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.dependencies && packageJson.dependencies.tailwindcss;
  } catch (error) {
    return false;
  }
}

// Analyze bundle size
function analyzeBundle() {
  console.log('📦 Analyzing bundle size...');
  
  try {
    // Run Next.js build analysis
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Build completed successfully');
    
    // Check if @next/bundle-analyzer is available
    try {
      execSync('npx @next/bundle-analyzer', { stdio: 'pipe' });
      console.log('✅ Bundle analyzer available');
    } catch (error) {
      console.log('⚠️  Install @next/bundle-analyzer for detailed analysis:');
      console.log('   npm install --save-dev @next/bundle-analyzer');
    }
  } catch (error) {
    console.log('❌ Build failed. Check your code for errors.');
  }
}

// Check image optimization
function checkImageOptimization() {
  console.log('🖼️  Checking image optimization...');
  
  const publicDir = path.join(process.cwd(), 'public');
  const srcDir = path.join(process.cwd(), 'src');
  
  let imageCount = 0;
  let optimizedCount = 0;
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) {
        imageCount++;
        
        // Check if it's a WebP image
        if (file.toLowerCase().endsWith('.webp')) {
          optimizedCount++;
        }
        
        // Check file size
        const sizeInKB = stat.size / 1024;
        if (sizeInKB > 500) {
          console.log(`⚠️  Large image detected: ${filePath} (${sizeInKB.toFixed(1)}KB)`);
        }
      }
    });
  }
  
  scanDirectory(publicDir);
  scanDirectory(srcDir);
  
  console.log(`📊 Found ${imageCount} images, ${optimizedCount} are WebP format`);
  
  if (optimizedCount / imageCount < 0.5) {
    console.log('💡 Consider converting images to WebP format for better performance');
  }
}

// Check CSS optimization
function checkCSSOptimization() {
  console.log('🎨 Checking CSS optimization...');
  
  const globalsCSS = path.join(process.cwd(), 'src/app/globals.css');
  
  if (fs.existsSync(globalsCSS)) {
    const cssContent = fs.readFileSync(globalsCSS, 'utf8');
    const cssSize = Buffer.byteLength(cssContent, 'utf8') / 1024;
    
    console.log(`📊 Global CSS size: ${cssSize.toFixed(1)}KB`);
    
    if (cssSize > 50) {
      console.log('💡 Consider purging unused CSS with Tailwind CSS');
    }
    
    // Check for unused CSS classes
    const classMatches = cssContent.match(/\.[a-zA-Z0-9_-]+/g) || [];
    const uniqueClasses = [...new Set(classMatches)];
    
    console.log(`📊 Found ${uniqueClasses.length} unique CSS classes`);
  }
}

// Check JavaScript optimization
function checkJSOptimization() {
  console.log('⚡ Checking JavaScript optimization...');
  
  const componentsDir = path.join(process.cwd(), 'src/components');
  
  if (fs.existsSync(componentsDir)) {
    let componentCount = 0;
    let dynamicImportCount = 0;
    
    function scanComponents(dir) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          scanComponents(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
          componentCount++;
          
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('dynamic(') || content.includes('lazy(')) {
              dynamicImportCount++;
            }
          } catch (error) {
            // Ignore read errors
          }
        }
      });
    }
    
    scanComponents(componentsDir);
    
    console.log(`📊 Found ${componentCount} components, ${dynamicImportCount} use dynamic imports`);
    
    if (dynamicImportCount / componentCount < 0.3) {
      console.log('💡 Consider using dynamic imports for large components');
    }
  }
}

// Generate optimization report
function generateReport() {
  console.log('\n📋 Performance Optimization Report\n');
  console.log('=' .repeat(50));
  
  Object.entries(optimizations).forEach(([key, optimization]) => {
    console.log(`\n${key.toUpperCase()}:`);
    console.log(`  Status: ${optimization.status}`);
    console.log(`  Description: ${optimization.description}`);
    console.log('  Recommended Actions:');
    optimization.actions.forEach(action => {
      console.log(`    • ${action}`);
    });
  });
  
  console.log('\n' + '=' .repeat(50));
}

// Generate Next.js configuration recommendations
function generateNextConfigRecommendations() {
  console.log('\n⚙️  Next.js Configuration Recommendations:\n');
  
  const recommendations = `
// next.config.js
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
  
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
`;

  console.log(recommendations);
}

// Generate package.json scripts
function generatePackageScripts() {
  console.log('\n📦 Package.json Scripts Recommendations:\n');
  
  const scripts = `
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "build:analyze": "cross-env ANALYZE=true npm run build",
    "lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html",
    "performance": "npm run build && npm run lighthouse",
    "optimize-images": "imagemin public/**/*.{jpg,jpeg,png} --out-dir=public/optimized",
    "purge-css": "tailwindcss --input src/app/globals.css --output src/app/globals.min.css --minify"
  }
}
`;

  console.log(scripts);
}

// Main execution
function main() {
  console.log('🔍 Running performance analysis...\n');
  
  // Check dependencies
  const hasNextJS = checkNextJS();
  const hasTailwind = checkTailwind();
  
  console.log(`Next.js: ${hasNextJS ? '✅' : '❌'}`);
  console.log(`Tailwind CSS: ${hasTailwind ? '✅' : '❌'}\n`);
  
  if (!hasNextJS) {
    console.log('❌ Next.js not found. Please install Next.js first.');
    return;
  }
  
  // Run analysis
  try {
    analyzeBundle();
    checkImageOptimization();
    checkCSSOptimization();
    checkJSOptimization();
    
    // Generate reports
    generateReport();
    generateNextConfigRecommendations();
    generatePackageScripts();
    
    console.log('\n🎉 Performance analysis completed!');
    console.log('\n📚 Next Steps:');
    console.log('1. Review the recommendations above');
    console.log('2. Implement optimizations based on your needs');
    console.log('3. Test performance improvements');
    console.log('4. Monitor Core Web Vitals');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  analyzeBundle,
  checkImageOptimization,
  checkCSSOptimization,
  checkJSOptimization,
  generateReport
}; 
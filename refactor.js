const fs = require('fs');
let code = fs.readFileSync('src/pages/ServiceDetail/ServiceDetail.jsx', 'utf8');

// 1. Add useParams
if (!code.includes('import { useParams } from')) {
    code = code.replace(/import \{ usePageMeta \} from '..\/..\/hooks\/usePageMeta';/, 
        "import { usePageMeta } from '../../hooks/usePageMeta';\nimport { useParams } from 'react-router-dom';");
}

// 2. Refactor Top-level arrays to accept locationName
code = code.replace('const strategies = [', 'const getStrategies = (locationName) => [');
code = code.replace('title: "Digital Marketing Agency Dubai"', 'title: `Digital Marketing Agency ${locationName}`');

// Use regex with 'g' to replace all occurrences inside strings in the defined arrays
code = code.replace(/in Dubai/g, 'in ${locationName}');
code = code.replace(/for Dubai market/g, 'for ${locationName} market');
code = code.replace(/Dubai’s/g, '${locationName}’s');
// Replace the specific competitors one
code = code.replace(/competitors in \$\{locationName\}\./g, 'competitors in ${locationName}.');

code = code.replace('const whyClickmecha = [', 'const getWhyClickmecha = (locationName) => [');
code = code.replace('const detailedServices = [', 'const getDetailedServices = (locationName) => [');

// 3. Inject into the component
const componentStartMatch = code.match(/const ServiceDetail = \(\) => \{\s+usePageMeta\('service-detail'\);/);
if (componentStartMatch) {
    code = code.replace(componentStartMatch[0], 
`const ServiceDetail = () => {
    const { location } = useParams();
    const formatLocation = (loc) => loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const locationName = location ? formatLocation(location) : 'Dubai';
    
    const strategies = getStrategies(locationName);
    const whyClickmecha = getWhyClickmecha(locationName);
    const detailedServices = getDetailedServices(locationName);

    usePageMeta('service-detail');`);
}

// 4. Replace literal 'Dubai' in JSX text with {locationName}
// Only replace if it is outside of JS logic but inside JSX. A simple way is to match tags.
// Anything like >...Dubai...<
let previousCode = "";
while(code !== previousCode) {
    previousCode = code;
    code = code.replace(/>([^<]*)Dubai([^<]*)</g, '>$1{locationName}$2<');
}

fs.writeFileSync('src/pages/ServiceDetail/ServiceDetail.jsx', code);
console.log("Refactored ServiceDetail.jsx successfully!");

const fs = require('fs');
let code = fs.readFileSync('src/pages/ServiceDetail/ServiceDetail.jsx', 'utf8');

if (!code.includes('import { useParams } from')) {
    code = code.replace(/import \{ usePageMeta \} from '..\/..\/hooks\/usePageMeta';/, 
        "import { usePageMeta } from '../../hooks/usePageMeta';\nimport { useParams } from 'react-router-dom';");
}

code = code.replace('const strategies = [', 'const getStrategies = (locationName) => [');
code = code.replace('title: "Digital Marketing Agency Dubai"', 'title: `Digital Marketing Agency ${locationName}`');

// Replace all 'in Dubai' inside the arrays BEFORE doing the JSX replacement
const arrRegex = /(const getStrategies.*?\];|const caseStudies.*?\];|const whyClickmecha.*?\];|const detailedServices.*?\];)/gs;
code = code.replace(arrRegex, (match) => {
    let replaced = match.replace(/in Dubai/g, 'in ${locationName}');
    replaced = replaced.replace(/for Dubai market/g, 'for ${locationName} market');
    replaced = replaced.replace(/Dubai’s/g, '${locationName}’s');
    replaced = replaced.replace(/competitors in Dubai\./g, 'competitors in ${locationName}.');
    return replaced;
});

code = code.replace('const whyClickmecha = [', 'const getWhyClickmecha = (locationName) => [');
code = code.replace('const detailedServices = [', 'const getDetailedServices = (locationName) => [');

const componentStartRegex = /const ServiceDetail = \(\) => \{\s+usePageMeta\('service-detail'\);/;
code = code.replace(componentStartRegex, 
`const ServiceDetail = () => {
    const { location } = useParams();
    const formatLocation = (loc) => loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const locationName = location ? formatLocation(location) : 'Dubai';
    
    // Fallback if the user is hitting /service-detail as usual
    const strategies = getStrategies(locationName);
    const whyClickmecha = getWhyClickmecha(locationName);
    const detailedServices = getDetailedServices(locationName);

    usePageMeta('service-detail');`);


let previousCode = "";
while(code !== previousCode) {
    previousCode = code;
    code = code.replace(/>([^<]*?)Dubai([^<]*?)</g, '>$1{locationName}$2<');
}

fs.writeFileSync('src/pages/ServiceDetail/ServiceDetail.jsx', code);
console.log("Refactored successfully!");

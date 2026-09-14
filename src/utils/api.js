const API_BASE_URL = 'https://cms.clickmecha.com/api';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

const normalizeServices = (services) => {
    if (Array.isArray(services)) {
        const filteredServices = services
            .map((service) => (typeof service === 'string' ? service.trim() : ''))
            .filter(Boolean);

        return filteredServices.length > 0 ? filteredServices : undefined;
    }

    if (isNonEmptyString(services)) {
        return services.trim();
    }

    return undefined;
};

/**
 * Fetch all services page data including services list and why choose us items
 */
export const fetchServicesData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/services`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching services data:', error);
        throw error;
    }
};

/**
 * Fetch home page data
 */
export const fetchHomeData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/home`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        throw error;
    }
};

/**
 * Fetch about page data
 */
export const fetchAboutData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/about`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching about data:', error);
        throw error;
    }
};

/**
 * Submit contact form
 */
export const submitContactForm = async (formData) => {
    try {
        const currentPageUrl = typeof window !== 'undefined' ? window.location.href : undefined;
        const payload = {
            name: isNonEmptyString(formData?.name) ? formData.name.trim() : '',
            email: isNonEmptyString(formData?.email) ? formData.email.trim() : '',
            phone: isNonEmptyString(formData?.phone) ? formData.phone.trim() : '',
            message: isNonEmptyString(formData?.message) ? formData.message.trim() : '',
            agree: formData?.agree,
        };

        if (isNonEmptyString(formData?.company_name)) {
            payload.company_name = formData.company_name.trim();
        }

        if (isNonEmptyString(formData?.budget)) {
            payload.budget = formData.budget.trim();
        }

        const normalizedServices = normalizeServices(formData?.services);
        if (normalizedServices) {
            payload.services = normalizedServices;
        }

        const pageUrl = isNonEmptyString(formData?.page_url)
            ? formData.page_url.trim()
            : isNonEmptyString(formData?.url)
                ? formData.url.trim()
                : currentPageUrl;

        if (pageUrl) {
            payload.page_url = pageUrl;
            payload.url = pageUrl;
        }

        const response = await fetch(`${API_BASE_URL}/contact-us`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error! status: ${response.status}`);
        }

        // Determine Pabbly webhook URL: new webhook (d5131i) for landing page, existing webhook (d5132i) for others
        const isLandingPage = pageUrl && (pageUrl.includes('/growthlanding') || pageUrl.includes('growthlanding'));
        const targetWebhook = isLandingPage
            ? 'https://connect.pabbly.com/webhook-listener/webhook/IjU3NjAwNTZiMDYzMzA0M2M1MjY5NTUzNiI_3D_pc/IjU3NjcwNTY5MDYzNjA0MzU1MjY5NTUzZDUxMzEi_pc'
            : 'https://connect.pabbly.com/webhook-listener/webhook/IjU3NjAwNTZiMDYzMzA0M2M1MjY5NTUzNiI_3D_pc/IjU3NjcwNTY5MDYzNjA0MzU1MjY5NTUzZDUxMzIi_pc';

        // Also send to Pabbly webhook (fire-and-forget, doesn't block main flow)
        fetch(targetWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).catch((err) => console.warn('Pabbly webhook error:', err));

        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

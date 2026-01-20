export default function pageViewed(operation, key, value) {
    if (typeof window === 'undefined' || !window.sessionStorage) {
        return;
    }

    if (operation === "set" && value) {
        try {
            // Get existing array from sessionStorage
            const existingData = window.sessionStorage.getItem(key);
            let viewedArray = [];
            
            // Parse existing data if it exists
            if (existingData) {
                try {
                    viewedArray = JSON.parse(existingData);
                    // Ensure it's an array
                    if (!Array.isArray(viewedArray)) {
                        viewedArray = [viewedArray];
                    }
                } catch (e) {
                    // If parsing fails, treat as single value
                    viewedArray = [existingData];
                }
            }
            
            // Add new value only if it doesn't already exist
            if (!viewedArray.includes(value)) {
                viewedArray.push(value);
            }
            
            // Store the array as JSON string
            window.sessionStorage.setItem(key, JSON.stringify(viewedArray));
        } catch (error) {
            console.error('Error storing page viewed data:', error);
        }
    }
    
    if (operation === "get") {
        try {
            const data = window.sessionStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            }
            return [];
        } catch (error) {
            console.error('Error retrieving page viewed data:', error);
            return [];
        }
    }
}
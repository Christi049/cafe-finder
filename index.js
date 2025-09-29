let map;

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
        zoom: 13
    });
    
    // Get user location and load cafes
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            // Center map on user
            map.setCenter(userLocation);
            
            // Load nearby cafes
            loadNearbyCafes(userLocation.lat, userLocation.lng);
        });
    }
}

// Get cafes from your backend
async function loadNearbyCafes(lat, lng) {
    try {
        const response = await fetch(`http://localhost:3000/api/cafes?lat=${lat}&lng=${lng}`);
        const data = await response.json();
        
        // Add markers to map
        data.results.forEach(cafe => {
            new google.maps.Marker({
                position: {
                    lat: cafe.geometry.location.lat,
                    lng: cafe.geometry.location.lng
                },
                map: map,
                title: cafe.name
            });
        });
        
    } catch (error) {
        console.error('Error loading cafes:', error);
    }
}

// Call initMap when Google Maps loads
window.initMap = initMap;
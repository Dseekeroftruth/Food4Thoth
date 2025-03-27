

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-nav');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.neumorphic-tab');

    // Toggle navigation visibility
    toggleButton.addEventListener('click', () => {
        const isHidden = navigation.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Site Nav' : '✖ Close';
    });

    // Close navigation when clicking a link and navigate to the section
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.add('hidden');
            toggleButton.textContent = '☰ Site Nav'; // Reset button text
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-nav1');
    const navigation = document.getElementById('navigation1');
    const navLinks = document.querySelectorAll('.neumorphic-tab');

    // Toggle main navigation visibility
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from triggering the document click listener
        const isHidden = navigation.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Web Nav' : '✖ Close';
    });

    // Handle submenu expansion
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const submenuId = link.getAttribute('data-expand');
            if (submenuId) {
                event.preventDefault(); // Prevent link navigation
                const submenu = document.getElementById(submenuId);
                submenu.classList.toggle('hidden'); // Toggle submenu visibility
            } else {
                navigation.classList.add('hidden'); // Hide navigation if it's a regular link
                toggleButton.textContent = '☰ Nav';
            }
        });
    });

    // Close navigation when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!navigation.contains(event.target) && !toggleButton.contains(event.target)) {
            if (!navigation.classList.contains('hidden')) {
                navigation.classList.add('hidden');
                toggleButton.textContent = '☰ Nav';
            }
        }
    });
});



// ... (businessData and businessPreviewUrls remain unchanged) ...
const businessData = {
    // Aesthetics & Personal Care
    "Angela Clark - Natural Hair Care Specialist": "angela-clark-natural-hair-care-specialist",
    "Beauty by Kinaya": "beauty-by-kinaya",
    "Bianca's Retreat": "biancas-retreat",
    "Blessings Hair Design": "blessings-hair-design",
    "Boldly Rooted Studio": "boldly-rooted-studio",
    "Brianna Stubbs, LMT #24914 - Corrective & Connective Therapy Clinic": "brianna-stubbs",
    "Glamour Girl & Guys Hair": "glamour-girl-guys-hair",
    "Glo-up Salon LLC - Natural Hair Salon": "glo-up-salon-llc",
    "HAPI Hair Studio (Hair Artists in Pursuit of Inclusion)": "hapi-hair-studio",
    "Harmony Massage": "harmony-massage",
    "Harold Toliver, LMT #6879": "harold-toliver",
    "King Klaws": "king-klaws",
    "Mos Faded Barber Shop": "mos-faded-barbershop",
    "Nails by Nyaah": "nails-by-nyaah",
    "Pacific Northwest Wellness": "pacific-northwest-wellness",
    "Rumors Salon": "rumors-salon",
    "Sherockslocs": "sherockslocs",
    "The J Spa - Multi Ethnic Beauty Supply and Day Spa": "the-j-spa",
    "Wax'd": "waxd",

    // Automotive
    "541 Customs and Automotive Repair": "541-customs-and-automotive-repair",
    "CEI Ventures - Custom Automotive Painting & Bodywork": "cei-ventures",
    "Diamond Roadside Services": "diamond-roadside-services",
    "Liberty Auto": "liberty-auto",
    "Top Class Auto Salon": "top-class-auto-salon",

    // Consultants
    "Alai Community Consulting": "alai-community-consulting",
    "Black Girl From Eugene LLC": "black-girl-from-eugene",
    "Kenya Luvert Consulting & Associates LLC - Social Justice Equity Consulting": "kenya-luvert-consulting",
    "Siobhan's Solutions, LLC": "siobhans-solutions",

    // Education
    "College Hill Blessings - Infants and Toddlers": "college-hill-blessings",
    "Blessings Manor Daycare - 6 Weeks to 12 Years Old": "blessings-manor-daycare",
    "Lane County African American Black Student Success": "lane-county-black-student-success",
    "Oregon Young Scholars Program": "oregon-young-scholars",
    "Searsy Green Real Learning LLC - Grades K-6": "searsy-green-real-learning",

    // Financial Services
    "Anthony Kennedy - Country Financial Representative": "anthony-kennedy",
    "Dahl Integration Marketing": "dahl-integration-marketing",
    "Classy Irene's Bookkeeping Service": "classy-irenes-bookkeeping",
    "Joshua Stroud, CPFA - Workplace Retirement Plan Consultant": "joshua-stroud",

    // Fitness & Wellness
    "Healthy Moves": "healthy-moves",
    "Kingdom Elite Cheerleading": "kingdom-elite-cheerleading",
    "Let's Move Fitness - Dance and Alignment Studio": "lets-move-fitness",
    "Live Greene 35 - Sports Performance": "live-greene-35",
    "OG Studios": "og-studios",
    "Xcape Dance Academy": "xcape-dance-academy",

    // Food & Beverage
    "Alma Foods & Catering LLC": "alma-foods",
    "BBQ by Tony": "bbq-by-tony",
    "The Bold Flavor": "the-bold-flavor",
    "Chef Andre Royal": "chef-andre-royal",
    "Dominican Delights - Empanadas & Organic Coffee": "dominican-delights",
    "Equiano Coffee": "equiano-coffee",
    "Harper Farms Inc": "harper-farms",
    "Irie Jamaican Kitchen": "irie-jamaican-kitchen",
    "Island Gyal Catering": "island-gyal-catering",
    "Justice Shave Ice": "justice-shave-ice",
    "Mishjacks Catering": "mishjacks-catering",
    "Noisette Pastry Kitchen": "noisette-pastry-kitchen",
    "Once Famous Grill - Food Truck": "once-famous-grill",
    "Philyaw's Cookout & Catering Service": "philyaws-cookout",
    "Pino Farms": "pino-farms",
    "Stewart's Soul Fusion": "stewarts-soul-fusion",
    "Yardy Eugene": "yardy-eugene",

    // Home Improvement
    "Cutting Edge Window Cleaning": "cutting-edge-window-cleaning",
    "Executive Landscape": "executive-landscape",
    "Morganic Roots Eco Firm": "morganic-roots",
    "Phil's Rooter Service": "phils-rooter-service",
    "RS Plumbing Contractor, Inc.": "rs-plumbing-contractor",
    "Clean Coats Painting LLC": "clean-coats-painting",

    // Legal
    "L.N. Jones Firm": "ln-jones-firm",
    "The Law Offices of Lourdes Sanchez P.C.": "law-offices-of-lourdes-sanchez",

    // Manufacturing
    "Wrico Generators": "wrico-generators",

    // Marketing & Creative Arts
    "Artistic Outlet Media": "artistic-outlet-media",
    "Kinetic Text - Video and Animation Production Services": "kinetic-text",
    "Revolution Design Group": "revolution-design-group",
    "Tao Websites & Graphic Design": "tao-websites",
    "Tatie B Photography": "tatie-b-photography",
    "The Black American Spring": "black-american-spring",
    "Uyo Digital Marketing": "uyo-digital-marketing",

    // Medical & Mental Health
    "Althea Herrell, LCSW, CCTP, ACS": "althea-herrell",
    "Jocelyn Bonner, MD": "jocelyn-bonner",
    "Karen Crocker-Wensel, MD - Willamette Valley Psychiatric Medicine": "karen-crocker-wensel",
    "Natasha Crow, MA, NCC, LPC": "natasha-crow",
    "Sandra G. Stubbs, MA, LPC - iFinish Strong Enrichment Center, LLC": "sandra-stubbs",
    "Porshea Pendleton, LMFT, CADC - P&P Therapeutic Counseling Inc.": "porshea-pendleton",

    // Real Estate/Brokerage
    "Betty Snowden Real Estate": "betty-snowden-real-estate",
    "Jhonelle Lewis (eXp Realty w/ Eugene Realty Group)": "jhonelle-lewis",
    "Josh Higbee (eXp Realty w/ PowerHouse Real Estate)": "josh-higbee",
    "Kukuli Moran-Garcia": "kukuli-moran-garcia",

    // Non-profits & Organizations
    "Blacks in Government - Eugene/Springfield Chapter #852-8972": "blacks-in-government",
    "BLACKS (Black Leaders Activating Cultural Knowledge to Succeed)": "blacks",
    "NAACP - Eugene/Springfield Branch #1119": "naacp",
    "Sisters Circle Eugene Inc.": "sisters-circle-eugene",
    "Sean's Place - Adult Foster Care": "seans-place",
    "Suddenly Sleepy 5K - Narcolepsy & Sleep Disorders": "suddenly-sleepy",

    // Retail
    "delaterracotta - Ceramics": "delaterracotta",
    "Devote30 Wireless": "devote30-wireless",
    "Hatchet Originals - Handcrafted Wooden Flight Sets": "hatchet-originals",
    "Made with Sol": "made-with-sol",
    "Mira Sunday - Sweet Skins Hemp Organic Apparel": "mira-sunday",
    "Oregon Fiber Traders": "oregon-fiber-traders",
    "Westside Stamp & Printing": "westside-stamp",
    "Yarbs & Roots - Body & Haircare Products": "yarbs-and-roots",

    // Vapors/Cannabis
    "Elev8 Cannabis": "elev8-cannabis",
    "Juiced Up Vapors": "juiced-up-vapors",

    // Other
    "Ash Canty - Death Walker & Spirit Medium": "ash-canty",
    "Black Label Tattoo": "black-label-tattoo",
    "Chemical Testing Mobile Services - Drug & Alcohol Testing/Fingerprinting Services": "chemical-testing-mobile"
};

        // Business Preview URLs
const businessPreviewUrls = {
    // Aesthetics & Personal Care
    "Angela Clark - Natural Hair Care Specialist": {
        instagram: "https://instagram.com/twistedhair524"
    },
    "Beauty by Kinaya": {
        instagram: "https://instagram.com/beautybykinaya"
    },
    "Bianca’s Retreat": {
        website: "https://www.biancasretreat.com"
    },
    "Blessings Hair Design": {
        website: "http://www.blessingshairdesign.com"
    },
    "HAPI Hair Studio (Hair Artists in Pursuit of Inclusion)": {
        website: "http://hapihair.net/hapi-hair-studio",
        instagram: "https://instagram.com/hapi.hair.studio"
    },
    "Harmony Massage": {
        website: "http://www.eugeneharmonymassage.com"
    },
    "King Klaws": {
        website: "https://kingsklaws.square.site"
    },
    "Nails by Nyaah": {
        instagram: "https://instagram.com/nailsbynyaah"
    },
    "Pacific Northwest Wellness": {
        website: "http://www.pacificnorthwestwellness.com",
        facebook: "https://www.facebook.com/pacificnorthwestwellness"
    },
    "Sherockslocs": {
        instagram: "https://instagram.com/sherockslocs"
    },
    "Wax'd": {
        instagram: "https://instagram.com/waxdbyangela"
    },
    // Automotive
    "CEI Ventures - Custom Automotive Painting & Bodywork": {
        website: "https://www.ceicoatings.com"
    },
    "Liberty Auto": {
        instagram: "https://instagram.com/werlibertyauto"
    },
    // Consultants
    "Black Girl From Eugene LLC": {
        website: "https://blackgirlfromeugene.org"
    },
    // Education
    "Lane County African American Black Student Success": {
        website: "https://lesd.k12.or.us"
    },
    // Fitness & Wellness
    "Healthy Moves": {
        website: "https://hm4kids.org"
    },
    "Let's Move Fitness - Dance and Alignment Studio": {
        website: "https://letsmovewithd.com"
    },
    "Live Greene 35 - Sports Performance": {
        instagram: "https://instagram.com/livegreene35"
    },
    "Chef Andre Royal": {
        website: "https://chefandreroyal.com"
    },
    "Dominican Delights - Empanadas & Organic Coffee": {
        instagram: "https://instagram.com/dominicandelightseugene"
    },
    "Noisette Pastry Kitchen": {
        website: "https://www.noisettepk.com"
    },
    "Once Famous Grill - Food Truck": {
        facebook: "https://www.facebook.com/catfishnshrimp"
    },
    "Philyaw’s Cookout & Catering Service": {
        website: "https://www.philyawscookout.com"
    },
    "Pino Farms": {
        facebook: "https://facebook.com/pinofarms2016"
    },
    // Home Improvement
    "Executive Landscape": {
        website: "https://www.executivescape.com",
        facebook: "https://www.facebook.com/executivelandscape"
    },
    "RS Plumbing Contractor, Inc.": {
        website: "https://rsplumbinginc.com"
    },
    // Manufacturing
    "Wrico Generators - Reliable power for your work, home, and life": {
        website: "https://wricogenerators.com"
    },
    // Marketing & Creative Arts
    "Artistic Outlet Media": {
        website: "https://www.artisticoutletmedia.net"
    },
    "Kinetic Text - Video and Animation Production Services": {
        website: "https://www.kinetictext.com"
    },
    "Tao Websites & Graphic Design": {
        website: "https://www.taowebsites.com"
    },
    "Tatie B Photography": {
        website: "https://tatiebphotography.com"
    },
    "The Black American Spring": {
        website: "https://theblackamericanspring.com/contact/services/"
    },
    "Uyo Digital Marketing": {
        website: "https://www.uyodigitalmarketing.com"
    },
    // Medical & Mental Health
    "Jocelyn Bonner, MD": {
        website: "https://www.healthgrades.com/physician/dr-jocelyn-bonner-xjsxh"
    },
    "Natasha Crow, MA, NCC, LPC": {
        website: "https://Natasha-Crow.com",
        instagram: "https://instagram.com/natashacrowofficial",
        facebook: "https://facebook.com/natachacrowcounseling"
    },
    "Sandra G. Stubbs, MA, LPC - iFinish Strong Enrichment Center, LLC": {
        website: "https://www.ifscounseling.net"
    },
    // Real Estate/Brokerage
    "Josh Higbee (eXp Realty w/ PowerHouse Real Estate)": {
        website: "https://PowerHouseRET.com"
    },
    "Kukuli Moran-Garcia": {
        website: "https://kukuli.withwre.com"
    },
    "BLACKS (Black Leaders Activating Cultural Knowledge to Succeed)": {
        website: "https://blacksinoregon.com"
    },
    "Suddenly Sleepy 5K - Narcolepsy & Sleep Disorders": {
        website: "https://suddenlysleepy.org"
    },
    "Devote30 Wireless": {
        website: "http://www.devote30.com/"
    },
    "Made with Sol": {
        website: "https://madewithsol.com"
    },
    // Other
    "Black Label Tattoo": {
        website: "https://blacklabeltattoo.net"
    },
    "Chemical Testing Mobile Services - Drug & Alcohol Testing/Fingerprinting Services": {
        website: "https://drugtesteugene.com"
    }
};


// Function to toggle the visibility of the clear button
function toggleClearButton() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearButton');

    clearButton.style.display = searchInput.value.length > 0 ? 'block' : 'none';
}

// Function to clear the search input
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsBox = document.getElementById('suggestions');

    searchInput.value = '';
    suggestionsBox.style.display = 'none';
    toggleClearButton();
    searchInput.focus();
}

// Optimize search input with throttling
let searchTimeout;
function searchListings() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const suggestionsBox = document.getElementById('suggestions');
        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'none';

        if (input.length > 0) {
            const filteredSuggestions = Object.keys(businessData).filter(business =>
                business.toLowerCase().includes(input)
            );

            if (filteredSuggestions.length > 0) {
                suggestionsBox.style.display = 'block';

                filteredSuggestions.forEach(suggestion => {
                    const suggestionDiv = document.createElement('div');
                    suggestionDiv.className = 'suggestion-item';
                    suggestionDiv.textContent = suggestion;

                    suggestionDiv.addEventListener('mousedown', (event) => {
                        event.preventDefault();
                        handleSuggestionClick(suggestion);
                    });

                    suggestionsBox.appendChild(suggestionDiv);
                });
            }
        }
    }, 300); // Throttle search to prevent rapid updates
}

// Handle suggestion click with appropriate yOffset
function handleSuggestionClick(suggestion) {
    const categoryId = businessData[suggestion];
    if (categoryId) {
        const targetElement = document.getElementById(categoryId);

        if (targetElement) {
            const yOffset = -80; // Adjust for sticky header
            const yPosition = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({
                top: yPosition,
                behavior: 'smooth',
            });

            // If you had lazy loading setup, you could trigger it here
            // setupLazyLoading(targetElement);
        }
    }
}



// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Scroll to the bottom of the page
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight, // Scroll to the full height of the page
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Ensure suggestions hide correctly
document.getElementById('searchInput').addEventListener('blur', () => {
    setTimeout(() => {
        document.getElementById('suggestions').style.display = 'none';
    }, 100);
});

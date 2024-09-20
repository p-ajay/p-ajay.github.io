// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});



/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

const navbarHeight = document.querySelector('.header_section').offsetHeight;

// Smooth scroll function with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Scroll to the element, adjusted for the height of the navbar
    window.scrollTo({
      top: targetElement.offsetTop - navbarHeight, // Adjust for navbar height
      behavior: 'smooth'
    });
  });
});


//Close Navmenu once a menu item is clicked
document.querySelectorAll('.navbar-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      const isNavbarExpanded = navbarCollapse.classList.contains('show');

      if (isNavbarExpanded) {
        // Collapse the navbar after clicking on a nav link
        $('.navbar-collapse').collapse('hide');
      }
    });
  });

//Event Listener to not reload page on search button submit 
/*document.getElementById('searchForm').addEventListener('submit', function(event) {
event.preventDefault(); // Prevents the form from submitting and reloading the page
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const isNavbarExpanded = navbarCollapse.classList.contains('show');

    if (isNavbarExpanded) {
        // Collapse the navbar after clicking on a nav link
        $('.navbar-collapse').collapse('hide');
    }
// You can add your search functionality here
console.log('Search button clicked, no reload');
});*/

//JS to update email to google sheets on submit
// https://script.google.com/macros/s/AKfycbwuhlTYcodIv4KtxJ3gqahg9BqtOeNaaLin8hIp7JUE9GJkMpgBYpAODiJN3vSUKdhCMw/exec

document.getElementById('subscribeForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  // Get the email value from the form
  const email = document.getElementById('emailInput').value;

  // Validate the email
  if (validateEmail(email)) {
    // Show the loader inside the button and hide the subscribe text
    document.querySelector('.subscribe-btn span').style.opacity = '0'; // Hide the text
    document.getElementById('loader').style.display = 'block';

    // URL of your Google Apps Script web app
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwuhlTYcodIv4KtxJ3gqahg9BqtOeNaaLin8hIp7JUE9GJkMpgBYpAODiJN3vSUKdhCMw/exec';

    // Data to send
    const formData = new FormData();
    formData.append('email', email);

    // Send the data to the Google Sheet using fetch
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => response.json())
      .then(response => {
        if (response.result === 'success') {
          // Hide the loader
          document.getElementById('loader').style.display = 'none';

          // Show thank-you message and hide the form
          document.getElementById('subscribeMessage').style.display = 'block';
          document.getElementById('subscribeForm').style.display = 'none';
        } else {
          // Hide the loader and show an error
          document.getElementById('loader').style.display = 'none';
          document.querySelector('.subscribe-btn span').style.opacity = '1'; // Show the text back
          alert('There was a problem with your subscription.');
        }
      })
      .catch(error => {
        // Hide the loader and show an error
        document.getElementById('loader').style.display = 'none';
        document.querySelector('.subscribe-btn span').style.opacity = '1'; // Show the text back
        console.error('Error!', error.message);
        alert('There was an error submitting your email.');
      });
  } else {
    alert('Please enter a valid email address.');
  }
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function navbarscroll(){
  let lastScrollTop = 0;
  const navbar = document.getElementById('navbarsection');

  window.addEventListener('scroll', function() {
    // Use window.scrollY instead of window.pageYOffset
    let currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Scrolling down, hide the navbar
      navbar.classList.add('navbar-hidden');
    } else {
      // Scrolling up, show the navbar
      navbar.classList.remove('navbar-hidden');
    }

    // Update the last scroll position
    lastScrollTop = Math.max(0, currentScroll); // Ensure scroll doesn't go negative
  });
}

navbarscroll();



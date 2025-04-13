document.addEventListener('DOMContentLoaded', function() {

     const calendarContent = document.getElementById('calendar-content');
    
     let currentDate = new Date();

     function renderCalendar() {
         const year = currentDate.getFullYear();
         const month = currentDate.getMonth();
        
         const monthNames = ["January", "February", "March", "April", "May", "June", 
                             "July", "August", "September", "October", "November", "December"];
        
         const daysInMonth = new Date(year, month + 1, 0).getDate();
        
         document.getElementById('current-month').innerText = `${monthNames[month]} ${year}`;
        
         let calendarHTML = `<table role='grid'><tr>`;
        
         // Create header for days
         const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
         days.forEach(day => {
             calendarHTML += `<th>${day}</th>`;
         });
        
         calendarHTML += `</tr><tr>`;
        
         // Fill in the blanks until the first day of the month
         for (let i = 0; i < new Date(year, month, 1).getDay(); i++) {
             calendarHTML += `<td></td>`;
         }
        
         // Fill in the days of the month
         for (let day = 1; day <= daysInMonth; day++) {
             if ((new Date(year, month, day).getDay() === 0) && day !== 1) {
                 calendarHTML += `</tr><tr>`;
             }
             calendarHTML += `<td>${day}</td>`;
         }
        
         calendarHTML += `</tr></table>`;
        
         calendarContent.innerHTML = calendarHTML;

         // Add event listeners for each day
         const cells = calendarContent.querySelectorAll('td');
         cells.forEach(cell => {
             if (cell.innerText) { // Only add event listeners to cells with a date
                 cell.addEventListener('click', () => showEventDetails(cell.innerText));
                 cell.style.cursor = 'pointer'; // Change cursor to pointer
             }
         });
        
        // Optional styling for today's date
        const today = new Date();
        if (today.getFullYear() === year && today.getMonth() === month) {
            const todayCell = Array.from(cells).find(cell => cell.innerText == today.getDate());
            if (todayCell) todayCell.style.backgroundColor = '#ffeb3b'; // Highlight today's date
        }
     }

     function showEventDetails(day) {
       document.getElementById('event-details').innerText = `Details for event on ${day} ${currentDate.toLocaleString('default', { month : 'long' })} ${currentDate.getFullYear()}`;
       const modal = document.getElementById('event-modal');
       modal.classList.add('show'); // Add class to trigger CSS transition
       modal.style.display = 'block';
       
       // Close modal functionality
       document.querySelector('.close').onclick = function() { 
           closeModal(); 
       };
       
       window.onclick = function(event) { 
           if (event.target == modal) { 
               closeModal(); 
           } 
       };
       
       window.onkeydown = function(event) { 
           if (event.key === 'Escape') { 
               closeModal();  
           }  
       };
       
       // Prevent scrolling when modal is open
       document.body.style.overflowY = 'hidden';
     }

     function closeModal() { 
         document.getElementById('event-modal').style.display = 'none'; 
         document.body.style.overflowY = ''; // Restore scrolling when modal is closed
     }

     document.getElementById('prev-month').addEventListener('click', function() {
         currentDate.setMonth(currentDate.getMonth() - 1);
         renderCalendar();
     });

     document.getElementById('next-month').addEventListener('click', function() {
         currentDate.setMonth(currentDate.getMonth() + 1);
         renderCalendar();
     });

     renderCalendar(); // Initial render

     function toggleNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive"; // Add responsive class
    } else {
        x.className = "topnav"; // Remove responsive class
    }
}
    
});

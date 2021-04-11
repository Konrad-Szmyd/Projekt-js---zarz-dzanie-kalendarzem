

class Kalendarz {


        constructor(){
            this.date = new Date();
            this.day = this.date.getDate();
            this.month = this.date.getMonth();
            this.year = this.date.getFullYear();
            this.choosenTime = null;
            this.choosenD = null;
            this.reservation = [];
            this.id = 0;
            this.avalible = true;
            this.createDateText()
            this.createTable();
            this.buttonNext();
            this.buttonPrev();
            this.DaysEvent();
            this.TimeEvent();
        }


        createTable(){
            const tab = document.querySelector('.table');
            tab.innerHTML = "";

            let tr = document.createElement("tr");
            const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
            days.forEach(day => {
                const th = document.createElement("th");
                th.innerHTML = day;
                tr.appendChild(th);
                 });
            tab.appendChild(tr);

            const daysInMonth = new Date(this.year, this.month+1, 0).getDate();

            const tempDate = new Date(this.year, this.month, 1);
            let firstMonthDay = tempDate.getDay();

            if (firstMonthDay === 0) {
            firstMonthDay = 7;
            }

            const j = daysInMonth + firstMonthDay - 1;

            if (firstMonthDay-1 !== 0) {
                tr = document.createElement("tr");
                tab.appendChild(tr);
             }

            for (let i=0; i<firstMonthDay-1; i++) {
                const td = document.createElement("td");
                td.innerHTML = "";
                tr.appendChild(td);
            }

            for (let i = firstMonthDay-1; i<j; i++) {
                if(i % 7 === 0){
                    tr = document.createElement("tr");
                    tab.appendChild(tr);
                }

                const td = document.createElement("td");
                td.innerText = i - firstMonthDay + 2;
                td.dayNr = i - firstMonthDay + 2;
                td.classList.add("day");

                if (this.year === this.date.getFullYear() && this.month === this.date.getMonth() && this.day === i - firstMonthDay + 2) {
                    td.classList.add("currentDay");
                }

            tr.appendChild(td);
            }

        }

        buttonNext(){
            const buttonNext = document.querySelector('.buttonNext');
            buttonNext.addEventListener("click", e => {
                this.month++;
                if (this.month > 11) {
                    this.month = 0;
                    this.year++;
                }
            
            this.createTable();
            this.createDateText();
            });
            
        }

        buttonPrev(){
            const buttonPrev = document.querySelector('.buttonPrev');
            buttonPrev.addEventListener("click", e => {
                this.month--;
                if (this.month < 0) {
                    this.month = 11;
                    this.year--;
                }
                this.createTable();
                this.createDateText();
            });
        }

        createDateText() {
            const monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
            const datePlace = document.querySelector('.callendar__head--date');
            datePlace.innerHTML = monthNames[this.month] + " " + this.year;
        }

        showTime(){
            const timePicker = document.querySelector('.timePicker');
            timePicker.style.display = "block";
        }

        hideTime(){
            const timePicker = document.querySelector('.timePicker');
            timePicker.style.display = "none";
        }

        


        DaysEvent() {
            const callendar__table = document.querySelector('.callendar__table');
                callendar__table.addEventListener("click", e => {
                if (e.target.tagName.toLowerCase() === "td" && e.target.classList.contains("day")) {
                    
                    const choosenDate = (e.target.dayNr + "-" + (this.month + 1) + "-" + this.year);
                    this.choosenD = choosenDate;
                    this.showTime();

                    

                }
            });

        }


        TimeEvent(){

            

            const time = document.querySelector('#appt');
                time.addEventListener('input', () =>{
                    
                    this.choosenTime = time.value;

                })

            const registrationButton = document.querySelector('.timePicker__button');
            registrationButton.addEventListener('click', () =>{
                this.id++;

                
                const termin = this.choosenTime + " " + this.choosenD;

                for(let i = 1; i < this.reservation.length; i++){
                    if(termin == this.reservation[i].data){
                        alert('Podany termin jest już zajęty, proszę wybrać inny');
                        time.value = "";
                        this.avalible = false;


                    } 
                }
                
                if(this.avalible){
                    const name = document.querySelector('#name').value;
                    const surname = document.querySelector('#surname').value;
                    
                    this.reservation[this.id] = {
                        "data" : this.choosenTime + " " +  this.choosenD,
                        "imie" : name,
                        "nazwisko": surname
                    }
                    localStorage.setItem('calendar', JSON.stringify(this.reservation));
                    console.log(this.choosenTime + this.choosenD);
                    this.hideTime();
                    alert("Termin zarezerwowano");
                }

                this.avalible = true;

                
                
            })
        }
}

    




kalendarz = new Kalendarz();


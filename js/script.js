    let money;
    let display;
    let displayInfo;
    let displayBalance;
    let progressBar;
    let progress;
    let bill_acc;
    let lock;
    
    bill_acc = document.getElementById("bill_acc");
    money = document.getElementById("money");
    display = document.getElementById("display");
    displayInfo = document.getElementById("displayInfo");
    displayBalance = document.getElementById("displayBalance");
    progressBar = document.getElementsByClassName("progress-bar")[0];
    progress = 0;
    lock = document.getElementById("lock");
    
    function balanceMoney(deposit, price)
    {
        let balance;
        
        balance = deposit - price;
        return balance;
    }
    
    function getCoffee(coffeName, price)
    {
        let result;
        let audio;
        result = balanceMoney(+money.value, price);
        
        if (result >= 0)
        {
            money.value = result;
            displayBalance.innerText = money.value;
            audio = new Audio("../coffee_machine/audio/coffee-machine.mp3");
            audio.play();
            
            let timerId = setInterval(()=> 
            {
                lock.hidden = false;
                
                if(progress > 110)
                {
                    clearInterval(timerId);
                    progressBar.style.width = 0 + '%';
                    progressBar.hidden = true;
                    displayInfo.innerHTML = `<i class="fas fa-mug-hot"></i> Кофе ${coffeName} готов`;
                    progress = 0;
                    lock.hidden = true;   
                    displayInfo.innerText = "Кофе " + coffeName + " готов";
                    glass.style.opacity = 1;
                    return;
                } else if(progress < 40)
                {
                    displayInfo.innerHTML = '<i class="fas fa-hourglass-start"></i> Приготовление...';
                }
                else if(progress < 80)
                {
                    displayInfo.innerHTML = '<i class="fas fa-hourglass-half"></i> Приготовление...';
                }
                else
                {
                    displayInfo.innerHTML = '<i class="fas fa-hourglass-end"></i> Готов';
                }
                
                    progressBar.hidden = false;
                    progressBar.style.width = ++progress + '%';
            }, 70);
            //console.log("Кофе "+coffeName+" готов");
            //getChange(result);
        }
        else
        {
            displayInfo.innerHTML = `<i class = "far fa-grin-beam-sweat"></i> Недостаточно средств`;
        }
    }
    
    function getChange(num)
    {
        let surrender;
        let audio;
        let top;
        let left;
        
        num = Number(num);
        
        while (num > 0)
        {
            if (num > 9)
            {
                num = num - 10;
                surrender = 10;
            }
            else if (num <= 9 && num > 4)
            {
                num = num - 5;
                surrender = 5;
            }
            else if (num < 5 && num > 1)
            {
                num = num - 2;
                surrender = 2;
            }
            else if (num ==  1)
            {
                num = num - 1;
                surrender = 1;
            }
            top = Math.random() * (change_box.getBoundingClientRect().height - 65);
            left = Math.random() * (change_box.getBoundingClientRect().width - 65);
            console.log(num, surrender);
            change_box.innerHTML += `<img onclick = 'this.style.display = "none"' src="../coffee_machine/image/${surrender}rubCoin.png" style = "top:${top}px; left:${left}px">`;
        }
        displayBalance.innerText = 0;
        audio = new Audio("../coffee_machine/audio/getChange.mp3");
        audio.play();
    }
    
    
    let banknotes = document.querySelectorAll("[src$='rub.jpg']"); // Коллекция (Как бы массив)
    let zIndex;
  
    zIndex = 1;
    let i;
    
    i = 0;
    
    while (i < banknotes.length)
    {
   // for(let i=0; i < banknotes.length; i++)
   // { // Перебираем коллекцию
        let banknote = banknotes[i]; // Записываем очередной элемент коллекции в переменную
        banknote.onmousedown = function(e)
        {
            this.ondragstart = function()
            {
                return false;
            }
          
            this.style.position = 'absolute';
            this.style.zIndex = ++zIndex;
            this.style.transform = 'rotate(90deg)';
            moveAt(e);
            
            function moveAt(event)
            {
                banknote.style.top = (event.clientY-banknote.offsetHeight/2)+'px';
                banknote.style.left = (event.clientX-banknote.offsetWidth/2)+'px';
            }
          
            document.addEventListener('mousemove', moveAt);
          
            this.onmouseup = function()
            {
                let bill_acc_top;
                let bill_acc_bottom;
                let banknote_top;

                document.removeEventListener('mousemove', moveAt);
                bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height * (2 / 3));
                bill_acc_top = bill_acc.getBoundingClientRect().top;    // Верх купюроприёмника
                banknote_top = this.getBoundingClientRect().top;        // Верх купюры    
                this.style.zIndex = 1;
                
                if (bill_acc_top < banknote_top && bill_acc_bottom > banknote_top && bill_acc.getBoundingClientRect().left
                < banknote.getBoundingClientRect().left && banknote.getBoundingClientRect().right 
                < bill_acc.getBoundingClientRect().right)
                {
                    money.value = (+ this.dataset.value) + (+ money.value);
                    displayBalance.innerText = money.value;
                    this.hidden = true;
                }
            }
        }
        i++;
    }

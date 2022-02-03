document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
    .then(res=>res.json())
    .then(data=>{
        let tBody = document.querySelector("#table-body")
        let dogName = document.querySelector("[name='name']")
        let dogBreed = document.querySelector("[name='breed']")
        let dogSex = document.querySelector("[name='sex']")
        let dogForm = document.querySelector("#dog-form")
        for(let obj of data ){
            let tr = document.createElement('tr')
            let tdName = document.createElement('td')
            let tdBreed = document.createElement('td')
            let tdSex = document.createElement('td')
            let tdEdit = document.createElement('td')
            let btn = document.createElement('button')
            tdName.innerText = obj.name 
            tdBreed.innerText = obj.breed 
            tdSex.innerText = obj.sex 
            btn.textContent = 'Edit Dog'
            tr.appendChild(tdName)
            tr.appendChild(tdBreed)
            tr.appendChild(tdSex)
            tdEdit.appendChild(btn)
            tr.appendChild(tdEdit)
            tBody.appendChild(tr)

            btn.addEventListener('click', ()=>{
                dogName.value = obj.name
                dogBreed.value = obj.breed
                dogSex.value = obj.sex

                dogForm.addEventListener('submit', (e)=>{
                    let formData = {
                        name: `${dogName.value}`,
                        breed: `${dogBreed.value}`,
                        sex: `${dogSex.value}`
                    }
                    fetch(`http://localhost:3000/dogs/${obj.id}`, {
                        method : 'PATCH',
                        headers :{
                        'Content-Type' : 'application/json'},
                        body : JSON.stringify(formData)
                    })
                    

                    e.preventDefault()
                    tdName.innerText = dogName.value
                    tdBreed.innerText = dogBreed.value
                    tdSex.innerHTML = dogSex.value

                
                })
    
            })

            

        }

    })


})
const form=document.querySelector('form');

form.addEventListener('submit',function(e){
   e.preventDefault();
    
   const height=document.querySelector('#height').value;
   const weight=document.querySelector('#weight').value;
   const results = document.querySelector('#results');

   if(height<=0){
    results.innerHTML=`plese enter a valid height ${height}`;
   }
   else if(weight<=0){
    results.innerHTML=`plese enter a valid weight ${weight}`;
   }
   else{
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    results.innerHTML=`<span>Your BMI is :${bmi}</span>`;
    
    const category=document.createElement('p');
    if (bmi < 18.6) {
        category.innerHTML = 'Sorry, you are in the underweight category.';
    } else if (bmi >= 18.6 && bmi <= 24.9) {
        category.innerHTML = 'Congratulations, you are in the normal weight category.';
    } else {
        category.innerHTML = 'Oops, you are in the overweight category.';
    }
    const referenceNode = form.children[4];
    form.insertBefore(category, referenceNode);
}

});
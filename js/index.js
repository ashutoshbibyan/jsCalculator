jQuery(function(){

    
    var result = 0;

    var inputCalObj = $("#inputCal");


    $(".number").on("click" , function(){
        var inputValue  = $("#inputCal").val();

        $("#inputCal").val(inputValue+this.innerText);
    });

    $("#c").on("click", function(){
       clearAll();
    });

    $("#del").on("click" , function(){
        console.log("del");
    });

    $("#percent").on("click" , function(){
        console.log("percent");
    });

    $("#division").on("click" , function(){
        inputCalObj.val(inputCalObj.val()+"/");
    });

    $("#multiply").on("click" , function(){
        inputCalObj.val(inputCalObj.val()+"*");
    });

    $("#minus").on("click" , function(){
        inputCalObj.val(inputCalObj.val()+"-");
    });

    $("#add").on("click" , function(){

       inputCalObj.val(inputCalObj.val()+"+");
        
    });

    $("#decimal").on("click" , function(){
        var currentValue = $("#inputCal").val();

    });

    $("#ans").on("click" , function(){
        console.log("ans");
    });

    $("#result").on("click" , function(){
        calculate();
        inputCalObj.val("Result = " + result);

    });

    function calculate(){
        
        var equation = inputCalObj.val();

        result = minusSolver(addSolver(multiplySolver(divisionSolver(bracketSolver(equation)))));


    }
   
    function clearAll(){
         // everything goes into intial state 
         $("#inputCal").val('');
         result= 0 ;
         valueStartIndex = 0;
    }
 
 
    function bracketSolver(str){

     //   console.log("eq " + str);

        while(str.includes("(")){

            var openingBracket = str.lastIndexOf("(");

           // console.log("opening bracket Index" + openingBracket);

            var closingBracket = str.indexOf(")",openingBracket);

            // console.log("closing bracket index" + closingBracket);

            var bracketString = str.substring(openingBracket+1 ,closingBracket);

            // console.log("bracket String " + bracketString);

           var solvedBracket =  minusSolver(addSolver(multiplySolver(divisionSolver(bracketString))));

           // console.log("solved bracket "  + solvedBracket);

           str = str.substring(0,openingBracket)+solvedBracket+str.substring(closingBracket+1);

           // console.log("new bracket string " + str);

        }

       return str;
    }


   function addSolver(str){

       while(str.includes("+")){

            var lastIndex  = str.indexOf("+");

            var firstNo = getFirstNo(str,lastIndex);

            var secondNo = getSecondNo(str,lastIndex);

            var result = parseFloat(firstNo)+parseFloat(secondNo);

            // console.log("first no " + firstNo);
            // console.log("second no" + secondNo);

            // console.log("last index" + lastIndex);
            var cutStart = lastIndex-firstNo.length;
            var cutEnd = lastIndex+secondNo.length;

            // console.log("cutStart" + cutStart);
            // console.log("cutend" + cutEnd);

            // console.log("old string" + str);

            str = str.substring(0,cutStart)+result+str.substr(cutEnd+1);
            

            // console.log("new string " + str);

            // console.log("result" + result);

       }

       return str ;
   }


   function minusSolver(str){
  

    while(str.includes("-")){

         var lastIndex  = str.indexOf("-");

         var firstNo = getFirstNo(str,lastIndex);

         var secondNo = getSecondNo(str,lastIndex);

         var result = parseFloat(firstNo)-parseFloat(secondNo);

         // console.log("first no " + firstNo);
         // console.log("second no" + secondNo);

         // console.log("last index" + lastIndex);
         var cutStart = lastIndex-firstNo.length;
         var cutEnd = lastIndex+secondNo.length;

         // console.log("cutStart" + cutStart);
         // console.log("cutend" + cutEnd);

         // console.log("old string" + str);

         str = str.substring(0,cutStart)+result+str.substr(cutEnd+1);
         

         // console.log("new string " + str);

         // console.log("result" + result);

    }

    return str ;
}

function multiplySolver(str){
   

    while(str.includes("*")){

         var lastIndex  = str.indexOf("*");

         var firstNo = getFirstNo(str,lastIndex);

         var secondNo = getSecondNo(str,lastIndex);

         var result = parseFloat(firstNo)*parseFloat(secondNo);

         // console.log("first no " + firstNo);
         // console.log("second no" + secondNo);

         // console.log("last index" + lastIndex);
         var cutStart = lastIndex-firstNo.length;
         var cutEnd = lastIndex+secondNo.length;

         // console.log("cutStart" + cutStart);
         // console.log("cutend" + cutEnd);

         // console.log("old string" + str);

         str = str.substring(0,cutStart)+result+str.substr(cutEnd+1);
         

         // console.log("new string " + str);

         // console.log("result" + result);

    }

    return str;
}




function divisionSolver(str){
    

    while(str.includes("/")){

         var lastIndex  = str.indexOf("/");

         var firstNo = getFirstNo(str,lastIndex);

         var secondNo = getSecondNo(str,lastIndex);

         var result = parseFloat(firstNo)/parseFloat(secondNo);

         // console.log("first no " + firstNo);
         // console.log("second no" + secondNo);

         // console.log("last index" + lastIndex);
         var cutStart = lastIndex-firstNo.length;
         var cutEnd = lastIndex+secondNo.length;

         // console.log("cutStart" + cutStart);
         // console.log("cutend" + cutEnd);

         // console.log("old string" + str);

         str = str.substring(0,cutStart)+result+str.substr(cutEnd+1);
         

         // console.log("new string " + str);

         // console.log("result" + result);
    }

    return str ;
}
   
    function getFirstNo(str , operatorIndex){
        
        var noIndexStart = operatorIndex;

        do {
            // console.log("index" + noIndexStart);
            if(noIndexStart >= 0){
                noIndexStart = noIndexStart - 1 ;
                var character = str.charAt(noIndexStart); 
                 // console.log("character" + character);
            }
            else{
                break;
            }
           
            
        } while (isNumeric(character));
        // adding one becuase one is subtracted before checking the while condition 
        noIndexStart= noIndexStart + 1 ;

        var no = str.substring(noIndexStart , operatorIndex);

        // console.log(" no is" + no);
        return no;
    }

    function getSecondNo(str , operatorIndex){
        var noIndexEnd = operatorIndex ;

        do{
            // console.log(" second no index"+noIndexEnd);

            

            if(noIndexEnd < str.length){
                noIndexEnd = noIndexEnd+1;
                var character = str.charAt(noIndexEnd);
                // console.log("character" + character);
            }
            else{
                break;
            }
        }
        while(isNumeric(character));

       
        // console.log(" second no operatorIndex" +operatorIndex);
        // console.log(" second no noindex" + noIndexEnd);
        var no = str.substring(operatorIndex+1 , noIndexEnd);

        // console.log("second no is " + no);

        return no;
    }

    function isNumeric(num){
        return !isNaN(num)
      }



    
});
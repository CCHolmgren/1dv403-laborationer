function Validator(){
    this.elements = document.querySelectorAll("input[type=text]");
    this.nonempty = document.getElementsByClassName("non-empty");
    var that = this;
    for(var i = 0; i < this.nonempty.length; i++)
    {
        this.nonempty[i].addEventListener("change", function(e){
            console.log(e);
            if(that.validateNonEmpty(e.target)){
                e.target.parentNode.className += " has-success";
            }
            else{
                e.target.parentNode.className += " has-warning";
            }
            
        });
    }
    console.log(this.elements);
    this.validateNonEmpty = function(e){
        return e.value != "";
    };
}
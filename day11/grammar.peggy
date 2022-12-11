Sentence = (monkey:Monkey _ { return monkey })+

Monkey =
	index:MonkeyIndex _
	items:StartingItems _
	operation:Operation _
	test:TestOperation _
	results:TestResults
    {
    	return {
        	index,
            items,
            operation,
            test,
            results
        }
    }

MonkeyIndex = "Monkey" _ Index:int ":" { return Index }

StartingItems =
	"Starting items:"
	_
	Items:(Value:int ("," _)? { return Value })+
    { return Items }

Operation =
	"Operation:" _
    "new" _
    "=" _
    first:OperationValue _
    operand:operand _
    second:OperationValue
    {
		if (first === "old" && second === "old") {
        	if (operand === "+") return function (v) { return v + v }
            if (operand === "-") return function (v) { return v - v }
            if (operand === "*") return function (v) { return v * v }
            if (operand === "/") return function (v) { return v / v }
        }
        if (first === "old" && second !== "old") {
        	if (operand === "+") return function (v) { return v + second }
            if (operand === "-") return function (v) { return v - second }
            if (operand === "*") return function (v) { return v * second }
            if (operand === "/") return function (v) { return v / second }
        }
        if (first !== "old" && second === "old") {
        	if (operand === "+") return function (v) { return first + v }
            if (operand === "-") return function (v) { return first - v }
            if (operand === "*") return function (v) { return first * v }
            if (operand === "/") return function (v) { return first / v }
        }
        if (operand === "+") return function (v) { return v + v }
        if (operand === "-") return function (v) { return v - v }
        if (operand === "*") return function (v) { return v * v }
        if (operand === "/") return function (v) { return v / v }
    }

OperationValue = "old" / int


TestOperation = "Test:" _ "divisible by" _ divideValue:int { return divideValue }

TestResults = (monkey:TestResult _ { return monkey })+
TestResult = "If" _ ("true"/"false") ":" _ "throw to monkey" _ monkey:int { return monkey }

int = [0-9]+ { return parseInt(text(), 10) }
_ = [\s\n\t ]*
operand = [+\-*/]
@builtin "number.ne"
@builtin "whitespace.ne"

Sentence -> (Monkey _ {% id %}):+ {% id %}

Monkey -> MonkeyIndex _
	StartingItems _
	Operation _
	TestOperation _
	TestResults
	{%
		function (d) {
			return {
				"monkey": d[0],
				"startingItems": d[2],
				"operation": d[4],
				"divideBy": d[6],
				"results": d[8]
			}
	   	}
	%}

MonkeyIndex ->
	"Monkey" _ int ":" {% function (d) { return d[2] } %}
StartingItems ->
	"Starting items:"
	_
	(int ("," _):? {% function (d) { return d[0] } %}):+
	{% function (d) { return d[2] }%}
Operation ->
	"Operation:" _
	"new" _
	"=" _
	OperationValue _
	operand _
	OperationValue
	{%
		function (d) {
			if (d[6] === "old" && d[10] === "old") {
				if (d[8] === "+") return function (v) { return v + v }
				if (d[8] === "-") return function (v) { return v - v }
				if (d[8] === "*") return function (v) { return v * v }
				if (d[8] === "/") return function (v) { return v / v }
			}
			if (d[6] === "old" && d[10] !== "old") {
				if (d[8] === "+") return function (v) { return v + d[10] }
				if (d[8] === "-") return function (v) { return v - d[10] }
				if (d[8] === "*") return function (v) { return v * d[10] }
				if (d[8] === "/") return function (v) { return v / d[10] }
			}
			if (d[6] !== "old" && d[10] === "old") {
				if (d[8] === "+") return function (v) { return d[6] + v }
				if (d[8] === "-") return function (v) { return d[6] - v }
				if (d[8] === "*") return function (v) { return d[6] * v }
				if (d[8] === "/") return function (v) { return d[6] / v }
			}
			if (d[8] === "+") return function (v) { return d[6] + d[10] }
			if (d[8] === "-") return function (v) { return d[6] - d[10] }
			if (d[8] === "*") return function (v) { return d[6] * d[10] }
			if (d[8] === "/") return function (v) { return d[6] / d[10] }
		}
	%}
OperationValue -> "old" {% id %} | int {% id %}
TestOperation -> "Test:" _ "divisible by" _ int {% function (d) { return d[4] } %}

TestResults -> (TestResult _ {% id %}):+ {% id %}
TestResult -> "If" _ ("true"|"false") ":" _ "throw to monkey" _ int {% function (d) { return d[7] } %}

#_ -> [\s\n]:* {% function (d) { return null } %}
operand -> [+\-*/] {% id %}
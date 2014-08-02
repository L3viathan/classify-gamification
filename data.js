var classes = [
	{
		"id": "class-a",
		"description": "Class A"
	},
	{
		"id": "class-b",
		"description": "Class B"
	},
	{
		"id": "class-c",
		"description": "Class C"
	}
]

var gold = [
	{
		"goldclass": "class-a",
		"description": "This is a sentence of type A.",
		"id": "1" //some unique identifier
	},
	{
		"goldclass": "class-b",
		"description": "This is a sentence of type B.",
		"id": "2" //some unique identifier
	},
	{
		"goldclass": "class-c",
		"description": "This is a sentence of type C.",
		"id": "3" //some unique identifier
	},
	{
		"goldclass": "class-a",
		"description": "This is a sentence of type A.",
		"id": "4" //some unique identifier
	},
	{
		"class": "class-b",
		"description": "This is a sentence of type B.",
		"id": "5" //some unique identifier
	}
];

var unknown = [
	{
		"description": "This is a sentence of an unknown type.",
		"id": "foo", //not in gold
		"annotation": [] //empty list
	},
	{
		"description": "This is another sentence of an unknown type.",
		"id": "foo", //not in gold
		"annotation": [] //empty list
	},
];
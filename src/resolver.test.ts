//import * as assert from 'assert';
import test from 'ava';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
//import * as vscode from 'vscode';
import * as resolver from './resolver';

var testCases = [
	[
		'/test/something/foo_test.rb',
		'/app/something/foo.rb',
	],
	[
		'/test/views/namespace/users/_something.html.erb_test.rb',
		'/app/views/namespace/users/_something.html.erb',
	],
	[
		'/test/views/namespace/users/something.html.haml_test.rb',
		'/app/views/namespace/users/something.html.haml',
	],
	[
		'/test/lib/something/foo_test.rb',
		'/lib/something/foo.rb',
	],
]

test("isSpec", (t) => {
	var testCases = [
		[
			'/test/foo/something_test.rb',
			true,
		],
		[
			'/test/views/something.html.erb_test.rb',
			true,
		],
		[
			'/app/foo/something.rb',
			false,
		],
		[
			'/test/views/something.html.erb.rb',
			false,
		]
	]
	t.plan(testCases.length);

	testCases.forEach(function(testCase) {
		var file = testCase[0];
		var expected = testCase[1];
		var res = resolver.isSpec(file);
		t.is(res, expected);
	});
});

test("specToCode", (t) => {
	t.plan(testCases.length);

	testCases.forEach(function(testCase) {
		var file = testCase[0];
		var expected = testCase[1];
		var res = resolver.specToCode(file);
		t.is(res, expected);
	});
});

test("codeToSpec", (t) => {
	t.plan(testCases.length);

	testCases.forEach(function(testCase) {
		var file = testCase[1];
		var expected = testCase[0];
		var res = resolver.codeToSpec(file);
		t.is(res, expected);
	});
});
export function getRelated(file) {
	if (isSpec(file)) {
		return specToCode(file);
	} else {
		return codeToSpec(file);
	}
}

export function isSpec(file) {
	return file.indexOf('_test.rb') > -1;
}

export function codeToSpec(file) {
	var viewRegex = /erb$|haml$|slim$/
	var isViewFile = file.match(viewRegex);

	if (isViewFile) {
		return file
			.replace('/app/', '/test/')
			.replace('.haml', '.haml_test.rb')
			.replace('.erb', '.erb_test.rb')
			.replace('.slim', '.slim_test.rb');
	}

	file = file.replace('.rb', '_test.rb');

	var isLibFile = file.indexOf('/lib/') > -1;
	if (isLibFile) {
		return file.replace('/lib/', '/test/lib/');
	}

	return file.replace('/app/', '/test/');
}

export function specToCode(file: string) {

	var viewRegex = /(.erb|.haml|.slim)_test.rb$/;

	var isViewFile = file.match(viewRegex);
	if (isViewFile) {
		return file
			.replace('_test.rb', '')
			.replace('/test', '/app');
	}

	file = file.replace('_test.rb', '.rb');

	var isLibFile = file.indexOf('/test/lib/') > -1;
	if (isLibFile) {
		return file.replace('/test/lib/', '/lib/');
	}

	return file.replace('/test/', '/app/');
}


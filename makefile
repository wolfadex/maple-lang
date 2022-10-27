hello: src/hello_world.s
	as -o dist/hello_world.o src/hello_world.s
	ld -macosx_version_min 11.0.0 -o dist/hello_world dist/hello_world.o -lSystem -syslibroot `xcrun -sdk macosx --show-sdk-path` -e _start -arch arm64
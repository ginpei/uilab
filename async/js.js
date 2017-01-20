

async function foo() {
	const p = new Promise(resolve=>{
		setTimeout(()=>resolve('OK'), 1000);
	});
	console.log(new Date().getSeconds(), '@bar p', p);

	const result = await p;

	console.log(new Date().getSeconds(), '@bar result', result);
	return result;
}

foo()
	.then((result)=>{
		console.log(new Date().getSeconds(), 'done!', result);
	});

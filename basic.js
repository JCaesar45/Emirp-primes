function emirps(input, returnAsArray = false) {
    // Helper function to check if a number is prime
    function isPrime(n) {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i * i <= n; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }
    
    // Helper function to reverse a number
    function reverseNumber(n) {
        return parseInt(n.toString().split('').reverse().join(''));
    }
    
    // Helper function to check if a number is an emirp
    function isEmirp(n) {
        if (!isPrime(n)) return false;
        const reversed = reverseNumber(n);
        return n !== reversed && isPrime(reversed);
    }
    
    // If input is a number (n), find first n emirps or nth emirp
    if (typeof input === 'number') {
        const emirpList = [];
        let num = 13; // Start from the first emirp
        
        while (emirpList.length < input) {
            if (isEmirp(num)) {
                emirpList.push(num);
            }
            num++;
        }
        
        return returnAsArray ? emirpList : emirpList[input - 1];
    }
    
    // If input is an array [start, end], find emirps in range
    if (Array.isArray(input) && input.length === 2) {
        const [start, end] = input;
        const emirpList = [];
        
        for (let num = start; num <= end; num++) {
            if (isEmirp(num)) {
                emirpList.push(num);
            }
        }
        
        return returnAsArray ? emirpList : emirpList.length;
    }
    
    throw new Error('Invalid input format');
}

// Test cases
console.log(emirps(20, true)); // [13,17,31,37,71,73,79,97,107,113,149,157,167,179,199,311,337,347,359,389]
console.log(emirps(1000)); // 70529
console.log(emirps([7700, 8000], true)); // [7717,7757,7817,7841,7867,7879,7901,7927,7949,7951,7963]
console.log(emirps([7700, 8000], false)); // 11

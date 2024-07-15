function vowelCount(str) {
    const vowels = ['a','e','i','o','u'];
    var counts = {'a':0,'e':0,'i':0,'o':0,'u':0};
    for(var i=0;i<str.length;i++) {
        var s = str[i].toLowerCase();
        if(vowels.includes(s)) {
            counts[s]++;
        }
    }
    console.log("a, e, i, o and u appear, respectively ", counts['a'], counts['e'], counts['i'], counts['o'], counts['u'], "times");
}

vowelCount("Le Tour de France");
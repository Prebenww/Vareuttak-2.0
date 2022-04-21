const varer = [{
	leverandør: "Biltema",
	lager: "Verktøy (D-116)",
	beskrivelse: "Dette er en beskrivelse",
	enhet: "kilo",
	artikkelnummer: 1
}, {
	leverandør: "BSA Betongvare",
	lager: "VVS",
	beskrivelse: "Dette er også en beskrivelse",
	enhet: "stk",
	artikkelnummer: 2
}, {
	leverandør: "Biltema",
	lager: "VVS",
	beskrivelse: "Dette er en lang beskrivelse som kommer til å gå over flere linjer i appen, så det må kunne håndteres på en eller anna måte",
	enhet: "meter",
	artikkelnummer: 3
}]

var id = req.params.id;

res.status(200);

res.json(varer[id - 1]);
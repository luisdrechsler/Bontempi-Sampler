Content.makeFrontInterface(800, 300);

// === onInit ===

// 1) UI
const var Mix = Content.addKnob("Mix", 10, 10);
Mix.setRange(0, 1, 0.001);    // 0 = nur sampler0, 1 = nur sampler1
Mix.setValue(0.5);

// 2) Effekte (Processor Ids exakt wie im Inspector!)
const var GAIN_A = Synth.getEffect("sampler0FxSimpleGain");
const var GAIN_B = Synth.getEffect("sampler1FxSimpleGain");

// 3) Hilfsfunktionen
inline function linToDb(x)
{
    return (x <= 0.000001) ? -100.0 : 20.0 * Math.log10(x);
}

inline function updateGains(m) // m in [0..1]
{
	

    local gA = Math.cos(m * Math.PI * 0.5);
    local gB = Math.sin(m * Math.PI * 0.5);

    // Simple Gain (FX): Attribut 0 = Gain (dB)
    GAIN_A.setAttribute(0, linToDb(gA));
    GAIN_B.setAttribute(0, linToDb(gB));
}

// 4) Callback BENANNT definieren + registrieren
inline function onMixChanged(component, value)
{
    updateGains(value);
}

Mix.setControlCallback(onMixChanged);

// 5) Initial anwenden
updateGains(Mix.getValue());

// (Optional) Debug
Console.print("GAIN_A ok: " + (GAIN_A != undefined));
Console.print("GAIN_B ok: " + (GAIN_B != undefined));function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 
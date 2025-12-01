// === onInit ===
Content.makeFrontInterface(800, 300);
Synth.deferCallbacks(true);


// === onInit ===
Synth.deferCallbacks(true);
const NUM_CHANNELS = 2;

const var Mix = Content.addKnob("Mix", 20, 20);
Mix.setRange(0, 1, 0.001);
Mix.setValue(0.5);
Mix.set("text", "Mic Mix");
Mix.set("showValuePopup", true);

const var GAIN_A = Synth.getEffect("sampler0FxSimpleGain");
const var GAIN_B = Synth.getEffect("sampler1FxSimpleGain");

inline function linToDb(x) { return (x <= 0.000001) ? -100.0 : 20.0 * Math.log10(x); }

inline function updateGains(m)
{
    local gA = Math.cos(m * Math.PI * 0.5);
    local gB = Math.sin(m * Math.PI * 0.5);
    GAIN_A.setAttribute(0, linToDb(gA)); // Attribut 0 = dB
    GAIN_B.setAttribute(0, linToDb(gB));
}

inline function onMixChanged(c, v) { updateGains(v); }
Mix.setControlCallback(onMixChanged);

updateGains(Mix.getValue());

// === On Init ===
const var noiseSampler = Synth.getSampler("sampler4Noise");

// === On Load ===
inline function onInitNoise()
{
    // Spielt die Note C-2 (MIDI 1) mit Velocity 127
    Synth.playNote(0, 127);
}
onInitNoise();;
;
// Simple Gain FX
const var NoiseGain = Synth.getEffect("sampler4FxSimpleGain");

// Vorhandenen Slider aus dem Interface holen
const var NoiseLevel = Content.getComponent("sldNoiseGain");

// Einstellungen (falls du sie per Script setzen willst)
NoiseLevel.set("text", "Noise");
NoiseLevel.set("mode", "Decibel");
NoiseLevel.setRange(-48, 0, 0.5);
NoiseLevel.setValue(-18);

// Callback
inline function onNoiseLevelControl(component, value)
{
    // Gain-Attribut 0 in dB steuern
    NoiseGain.setAttribute(0, value);
}

NoiseLevel.setControlCallback(onNoiseLevelControl);

// Initial anwenden
NoiseGain.setAttribute(0, NoiseLevel.getValue());

// 1) Effekte holen
const var WidthFX    = Synth.getEffect("ScriptFXWidth");
const var ChorusFXL  = Synth.getEffect("FXChorusL");
const var ChorusFXR  = Synth.getEffect("FXChorusR");

// 2) Regler anlegen
const var knbStereo = Content.addKnob("knbStereo", 20, 20);
knbStereo.set("text", "Stereo / Chorus");
knbStereo.setRange(0, 100, 1);
knbStereo.setValue(50);

// 3) Callback
inline function onknbStereoControl(component, value)
{
    local norm = value / 100.0;

    // a) Width FX
    local widthVal = -1 + norm * 3;
    WidthFX.setAttribute(WidthFX.Width, widthVal);

    // b) Chorus Depth log
    local minDepth = 0.00;
    local maxDepth = 0.40;
    local ratio = maxDepth / minDepth;

    local depth = minDepth * Math.pow(ratio, norm);

    // Attribute hier korrekt ersetzen!
    ChorusFXL.setAttribute(ChorusFXL.Width, depth);
    ChorusFXR.setAttribute(ChorusFXR.Width, depth);
}

knbStereo.setControlCallback(onknbStereoControl);
onknbStereoControl(knbStereo, knbStereo.getValue());
function onNoteOn()
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
 
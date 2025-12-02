// === onInit ===
Content.makeFrontInterface(800, 300);
Synth.deferCallbacks(true);


// === onInit ===
Synth.deferCallbacks(true);
const NUM_CHANNELS = 2;

const var Mix = Content.addKnob("Mix", 660, 180);
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
NoiseLevel.setRange(-100, -24, 0.5);
NoiseLevel.setValue(-24);

// Callback
inline function onNoiseLevelControl(component, value)
{
    // Gain-Attribut 0 in dB steuern
    NoiseGain.setAttribute(0, value);
}

NoiseLevel.setControlCallback(onNoiseLevelControl);

// Initial anwenden
NoiseGain.setAttribute(0, NoiseLevel.getValue());

// Effekte holen
const var VintageFX = Synth.getEffect("ScriptFxVintage");
const var SatFX     = Synth.getEffect("fxSaturator");
const var SatComp   = Synth.getEffect("fxSatCompGain");
const var ChorusFX  = Synth.getEffect("fxChorus");
const var ReverbFX  = Synth.getEffect("container0FxSimpleReverb"); // <--- NEU

// Knob anlegen
const var VintageSat = Content.addKnob("VintageSat", 40, 200);
VintageSat.set("text", "Vintage / Sat");
VintageSat.setRange(0.0, 1.0, 0.01); // sehr feine Schritte
VintageSat.set("showValuePopup", true);
VintageSat.set("mode", "NormalizedPercentage");

// Saturation-Ausgleich in dB
const var MAX_SAT_GAIN = 9.0;

// Callback
inline function onVintageSatControl(component, value)
{
    // 1) Vintage: 0–1
    VintageFX.setAttribute(0, value);

    // 2) Saturation: nur 0–0.4 normalized
    local satNorm = value * 0.4;
    SatFX.setAttribute(0, satNorm);
    
    // 3) Gain-Kompensation
    local compGainDb = -MAX_SAT_GAIN * value;
    SatComp.setAttribute(0, compGainDb);
    
    // 4) Chorus (leicht)
    //
    // Attribute:
    // 0 = Rate
    // 1 = Depth
    // 2 = Feedback
    //
    local chorusRate      = 0.4  * value;
    local chorusDepth     = 0.2  * value;
    local chorusFeedback  = 0.2  * value;

    ChorusFX.setAttribute(0, chorusRate);
    ChorusFX.setAttribute(1, chorusDepth);
    ChorusFX.setAttribute(2, chorusFeedback);


    // 5) Reverb (subtil)
    //
    // Attribute:
    // 0 = Wet Level
    // 1 = Damping
    // 2 = Stereo Width
    // 3 = Room Size
    //
    local reverbWet     = 0.40 * value;  // 0–10 %
    local reverbDamping = 0.30 * value;  // 0–30 %
    local reverbWidth   = 0.10 * value;  // 0–10 %
    local reverbRoom    = 0.20 * value;  // 0–20 %

    ReverbFX.setAttribute(0, reverbWet);
    ReverbFX.setAttribute(1, reverbDamping);
    ReverbFX.setAttribute(2, reverbWidth);
    ReverbFX.setAttribute(3, reverbRoom);
}

VintageSat.setControlCallback(onVintageSatControl);

// Startwert + initial anwenden
VintageSat.setValue(0.5);
onVintageSatControl(VintageSat, VintageSat.getValue());


// === Sub-Synth Gain ===

// Hole dein SimpleGain-Modul
const var SubGain = Synth.getEffect("SubWaveGeneratorSimpleGain");

// === Level-Knob ==
const var SubLevel = Content.addKnob("SubLevel", 520, 180);
SubLevel.set("text", "Sub Level");
SubLevel.setRange(-60, 0, 0.1);     // dB-Range
SubLevel.set("suffix", " dB");       // Anzeige
SubLevel.setValue(-24);

// Callback
inline function onSubLevelControl(component, value)
{
    SubGain.setAttribute(0, value);  // Attribute 0 = Gain (dB)
}

SubLevel.setControlCallback(onSubLevelControl);function onNoteOn()
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
 
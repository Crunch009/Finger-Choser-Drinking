const MAX_PLAYERS = 10;
const QUESTION_SECONDS = 6;

// ---------- QUESTIONS ----------
const CATEGORIES = [
  {
    name: "Truth", emoji: "😳", color: "#e91e63",
    items: [
      "What’s your favourite thing about yourself?",
      "Who was the last person you thought was cute?",
      "Have you ever had a crush on someone in this room?",
      "What’s your most embarrassing school moment?",
      "Who was your last crush?",
      "Have you ever ignored a message because you didn’t know what to say?",
      "Who in this room would you most like to get to know better?",
      "Have you ever liked two people at the same time?",
      "What’s the most embarrassing thing you’ve done to impress someone?",
      "Have you ever been jealous of a friend?",
      "Have you ever denied liking someone when you actually did?",
      "Who in this room would make the best date for you?",
      "Have you ever flirted with someone just to see their reaction?",
      "What’s the biggest hint you’ve ever dropped to someone you liked?",
      "Have you ever liked someone your friend also liked?",
      "What’s a confession you’ve been too embarrassed to make?",
      "What’s something you’ve done to get someone’s attention that you’d never admit publicly?",
      "Have you ever accidentally led someone on?",
      "If you could clear up one misunderstanding with someone, who would it be?",
      "What’s one genuine feeling or confession you’ve been avoiding sharing with someone?"
    ]
  },
  {
    name: "Dares", emoji: "🔥", color: "#ff5722",
    items: [
      "Do your most ridiculous dance for 10 seconds.",
      "Give someone a genuine compliment without laughing.",
      "Do your best impression of someone in the group.",
      "Deliver your cheesiest pickup line to a willing player.",
      "Hold eye contact with someone for 10 seconds.",
      "Let the group choose a funny nickname for you for the next three rounds.",
      "Act out how you behave when your crush walks past.",
      "Give a dramatic speech about why you’re the best person in the room.",
      "Hold a silly pose chosen by the group for 15 seconds.",
      "Have a 20-second fake first-date conversation with a willing player.",
      "Read a fictional love confession in your most dramatic voice.",
      "Ask a friend a harmless question chosen by the group.",
      "Make a fake confession to a chair as though it’s your soulmate.",
      "Re-create your most awkward fictional flirting attempt.",
      "Play a ridiculous character chosen by the group for two rounds.",
      "Give a 30-second speech explaining why your fictional crush should choose you.",
      "Act out a dramatic jealousy scene from an imaginary teen drama.",
      "Send a willing friend a funny, clearly joking message chosen by the group.",
      "Perform a mock reality-TV elimination speech about another player’s terrible pickup line.",
      "Perform an improvised confession scene with a willing player, complete with an unexpected plot twist."
    ]
  },
  {
    name: "Drinks", emoji: "🥤", color: "#2196f3",
    note: "Use any drink you like. Water always counts, and anyone can pass.",
    items: [
      "Grab a fizzy drink and give a dramatic toast.",
      "Take a sip of water, then compliment the person on your left.",
      "Describe your favourite drink like a five-star food critic.",
      "Invent a name for your drink and advertise it for 10 seconds.",
      "Take a sip of your drink, then answer a random truth.",
      "Do your best impression of someone in the group while holding your drink.",
      "Give a 20-second speech about why your drink is the best.",
      "Invent a ridiculous new flavour for your drink.",
      "Take a sip, then do your most ridiculous dance for 10 seconds.",
      "Give your drink a celebrity name and explain why.",
      "Describe your drink as if it were a Formula 1 driver.",
      "Make up a slogan for your drink.",
      "Take a sip, then tell the group your most harmless guilty pleasure.",
      "Let the group invent a funny nickname for your drink.",
      "Do a dramatic movie-trailer voice-over for your drink.",
      "Create a fancy restaurant description for plain water.",
      "Give a 10-second acceptance speech for winning Drink of the Year.",
      "Invent a mocktail recipe using three imaginary ingredients.",
      "Perform a villain monologue about stealing everyone's drinks.",
      "FINAL BOSS: make a dramatic toast to the group using any drink you choose."
    ]
  },
  {
    name: "The Exposure Room", emoji: "👀", color: "#9c27b0",
    items: [
      "Who in the group makes you laugh the most?",
      "Who here has the best sense of humour?",
      "Who would you trust with a secret?",
      "Who would be the best person to give you crush advice?",
      "Who is the hardest person here to read?",
      "Who would be the best at keeping a relationship private?",
      "Who here would be the most awkward on a first date?",
      "Who do you think is the biggest flirt?",
      "Who is most likely to have a secret crush?",
      "Who would you choose to be your partner in a fictional reality show?",
      "If you had to choose someone here for a pretend date, who would it be?",
      "Who would be the most likely to fall in love first?",
      "Who would you ask for advice if you liked the same person as your friend?",
      "Who here would be the hardest person to confess your feelings to?",
      "Who do you think gives the most confusing signals?",
      "If your crush liked your best friend, how would you handle it?",
      "Would you tell your best friend if you knew their crush liked you?",
      "What’s one thing you wish people understood about your approach to relationships?",
      "If you could resolve one awkward misunderstanding with someone, what would you want to clear up?",
      "Give one sincere, positive thing you’ve wanted to tell someone in the group but never found the right moment to say."
    ]
  },
  {
    name: "Wildcards", emoji: "⚡", color: "#fbc02d",
    items: [
      "Speak in an accent chosen by the group for one round.",
      "Invent a ridiculous superhero name for yourself.",
      "Perform a 10-second advert for your favourite snack.",
      "Let the group choose a song for your dramatic entrance.",
      "Give a mock acceptance speech for winning “Most Dramatic Person”.",
      "Make up a ridiculous rumour about an imaginary celebrity couple, then reveal it’s fictional.",
      "Act out a terrible first date with a willing player.",
      "Tell a story about your most embarrassing fictional moment.",
      "Perform a dramatic breakup speech about your favourite food.",
      "Create a fictional dating profile for an imaginary character.",
      "Give a weather forecast for the group’s romantic lives.",
      "Act out a scene where two fictional characters discover they like the same person.",
      "Make a fake proposal to a water bottle using a ridiculous speech.",
      "Let the group invent a harmless challenge for you to perform.",
      "Give a 20-second speech explaining why you should be crowned the group’s main character.",
      "Perform a reality-TV confession explaining an entirely fictional scandal.",
      "Invent a ridiculous love triangle involving three fictional characters.",
      "Give a dramatic speech about surviving the group’s worst pickup lines.",
      "Perform a final-boss villain monologue about stealing everyone’s snacks.",
      "Give a grand finale speech explaining why you survived all five categories."
    ]
  }
];

// ---------- ELEMENTS ----------
const stage = document.getElementById('stage');
const msg = document.getElementById('msg');
const count = document.getElementById('count');
const panel = document.getElementById('panel');
const dots = new Map();   // finger id -> circle
let timer = null;
let done = false;

// ---------- FINGER CHOOSER ----------
function place(dot, e) {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
}

function updateCount() {
  count.textContent = dots.size + ' / ' + MAX_PLAYERS;
}

function startTimer() {
  clearTimeout(timer);
  if (dots.size >= 2) {
    msg.textContent = 'Hold still...';
    timer = setTimeout(pick, 3000);
  } else {
    msg.textContent = 'Everyone put a finger down';
  }
}

function pick() {
  done = true;
  const all = [...dots.values()];
  const winner = all[Math.floor(Math.random() * all.length)];
  all.forEach(d => d.classList.add(d === winner ? 'win' : 'lose'));
  msg.textContent = 'Winner!';
  setTimeout(showRandomQuestion, 1500);
}

stage.addEventListener('pointerdown', e => {
  if (done || dots.size >= MAX_PLAYERS) return;
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.style.background = `hsl(${Math.random() * 360} 80% 55%)`;
  place(dot, e);
  stage.appendChild(dot);
  dots.set(e.pointerId, dot);
  updateCount();
  startTimer();
});

stage.addEventListener('pointermove', e => {
  const dot = dots.get(e.pointerId);
  if (dot && !done) place(dot, e);
});

function lift(e) {
  const dot = dots.get(e.pointerId);
  if (!dot) return;
  dot.remove();
  dots.delete(e.pointerId);
  updateCount();
  if (!done) startTimer();
}
stage.addEventListener('pointerup', lift);
stage.addEventListener('pointercancel', lift);

function resetGame() {
  panel.classList.add('hidden');
  dots.forEach(d => d.remove());
  dots.clear();
  updateCount();
  done = false;
  msg.textContent = 'Everyone put a finger down';
}

// ---------- RANDOM QUESTION ----------
function showRandomQuestion() {
  const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const level = Math.floor(Math.random() * 20) + 1;

  panel.innerHTML = '';
  panel.classList.remove('hidden');

  const title = document.createElement('h2');
  title.textContent = '🎉 Winner! ' + cat.emoji + ' ' + cat.name;
  panel.appendChild(title);

  const card = document.createElement('div');
  card.className = 'card';
  card.style.border = '3px solid ' + cat.color;

  const small = document.createElement('small');
  small.textContent = 'Level ' + level + ' of 20';
  card.appendChild(small);

  const text = document.createElement('div');
  text.textContent = cat.items[level - 1];
  card.appendChild(text);

  if (cat.note) {
    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = cat.note;
    card.appendChild(note);
  }

  panel.appendChild(card);

  // Shrinking timer bar
  const bar = document.createElement('div');
  bar.style.cssText = 'height:8px;border-radius:4px;margin:24px auto 0;max-width:640px;width:100%;background:' + cat.color + ';transition:width ' + QUESTION_SECONDS + 's linear;';
  panel.appendChild(bar);
  setTimeout(() => { bar.style.width = '0%'; }, 50);

  // Back to "place fingers" after the question time
  setTimeout(resetGame, QUESTION_SECONDS * 1000);
}

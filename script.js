//API's
let blocksum = "http://blocksum.org:11898/getinfo";
let swepool = "https://swepool.org/api/stats";
let coingecko = "https://api.coingecko.com/api/v3/coins/kryptokrona";

//User inputs


//Get Table Cells by ID
let dailyXKR = document.getElementById("daily");
let weeklyXKR = document.getElementById("weekly");
let monthlyXKR = document.getElementById("monthly");

let dollarDaily = document.getElementById("usdDaily");
let dollarWeekly = document.getElementById("usdWeekly");
let dollarMonthly = document.getElementById("usdMonthly");

async function calc() {
  await fetch(blocksum)
    .then((res) => res.json())
    .then(async (data) => {
      hashrateKh = data.hashrate / 1000
    });

  await fetch(swepool)
    .then((res) => res.json())
    .then(async (data) => {
      reward = data.lastblock.reward / 100000
    });

  await fetch(coingecko)
    .then((res) => res.json())
    .then(async (data) => {
      price = data.market_data.current_price.usd;
    });

    let userInput = document.getElementById("input").value;

    dailyReward = (((userInput / hashrateKh) * reward) * 960).toFixed(0)
    weeklyReward = ((((userInput / hashrateKh) * reward) * 960) * 7).toFixed(0)
    monthlyReward = ((((userInput / hashrateKh) * reward) * 960) * 30).toFixed(0)

    dailyXKR.textContent = dailyReward
    weeklyXKR.textContent = weeklyReward
    monthlyXKR.textContent = monthlyReward

    dollarDaily.textContent = '$' + (dailyReward * price).toFixed(2)
    dollarWeekly.textContent = '$' + (weeklyReward * price).toFixed(2)
    dollarMonthly.textContent = '$' + (monthlyReward * price).toFixed(2)


}




'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = 'white';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_SHADOW_GAP_X = 10;
var CLOUD_SHADOW_GAP_Y = 10;
var CLOUD_PADDING_X = 40;
var CLOUD_PADDING_Y = 20;
var CLOUD_TEXT_FONT = '16px PT Mono';
var CLOUD_TEXT_COLOR = '#000000';
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_COLOR_YOU = 'rgba(255, 0, 0, 1)';
var BAR_COLOR_PLAYERS = 'hsl(240, random%, 50%)';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 1 * CLOUD_WIDTH / 4, y + 10);
  ctx.lineTo(x + 2 * CLOUD_WIDTH / 4, y);
  ctx.lineTo(x + 3 * CLOUD_WIDTH / 4, y + 10);
  ctx.lineTo(x + 4 * CLOUD_WIDTH / 4, y);
  ctx.lineTo(x - 10 + 4 * CLOUD_WIDTH / 4, y + 1 * CLOUD_HEIGHT / 2);
  ctx.lineTo(x + 4 * CLOUD_WIDTH / 4, y + 2 * CLOUD_HEIGHT / 2);
  ctx.lineTo(x + 3 * CLOUD_WIDTH / 4, y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x + 2 * CLOUD_WIDTH / 4, y + CLOUD_HEIGHT);
  ctx.lineTo(x + 1 * CLOUD_WIDTH / 4, y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x + 0 * CLOUD_WIDTH / 4, y + CLOUD_HEIGHT);
  ctx.lineTo(x + 10, y + CLOUD_HEIGHT / 2);
  ctx.closePath();
  ctx.fill();
};

var renderCloudMessage = function (ctx, x, y, message) {
  ctx.font = CLOUD_TEXT_FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = CLOUD_TEXT_COLOR;
  ctx.fillText(message, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_GAP_X, CLOUD_Y + CLOUD_SHADOW_GAP_Y, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderCloudMessage(ctx, CLOUD_X + CLOUD_PADDING_X, CLOUD_Y + CLOUD_PADDING_Y, 'Ура, вы победили!');
  renderCloudMessage(ctx, CLOUD_X + CLOUD_PADDING_X, CLOUD_Y + CLOUD_PADDING_Y + 20, 'Список результатов:');

  ctx.font = CLOUD_TEXT_FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = CLOUD_TEXT_COLOR;

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var x = CLOUD_X + CLOUD_PADDING_X + (BAR_WIDTH + BAR_GAP) * i;
    var y = CLOUD_HEIGHT - CLOUD_PADDING_Y;
    var barHeight = times[i] * BAR_MAX_HEIGHT / maxTime;

    if (players[i] === 'Вы') {
      ctx.fillStyle = BAR_COLOR_YOU;
    } else {
      ctx.fillStyle = BAR_COLOR_PLAYERS.replace('random', Math.round(100 * Math.random()));
    }
    ctx.fillRect(x, y - 10, BAR_WIDTH, -barHeight);

    ctx.fillStyle = CLOUD_TEXT_COLOR;
    ctx.fillText(players[i], x, y, BAR_WIDTH + BAR_GAP);
    ctx.fillText(Math.round(times[i]), x, y - 30 - barHeight, BAR_WIDTH + BAR_GAP);
  }
};

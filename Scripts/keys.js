var keys = {
    bind: function() {
        keys.unbind();
        $(document).on('keydown.mario', function(event) {
            return keys.handler(event, true);
        });
        $(document).on('keyup.mario', function(event) {
            return keys.handler(event, false);
        });
        $(window).on('blur.mario', function() {
            keys.reset();
        });
    },
    syncAction: function(action) {
        keys[action] = Boolean(keys.keyboardState[action] || keys.touchState[action]);
    },
    resetTouch: function() {
        keys.touchState.left = false;
        keys.touchState.right = false;
        keys.touchState.accelerate = false;
        keys.touchState.up = false;
        keys.touchState.down = false;
        keys.syncAction('left');
        keys.syncAction('right');
        keys.syncAction('accelerate');
        keys.syncAction('up');
        keys.syncAction('down');
        if (typeof keys.onReset === 'function') {
            keys.onReset();
        }
    },
    reset: function() {
        keys.keyboardState.left = false;
        keys.keyboardState.right = false;
        keys.keyboardState.accelerate = false;
        keys.keyboardState.up = false;
        keys.keyboardState.down = false;
        keys.jumpQueued = false;
        keys.resetTouch();
    },
    unbind: function() {
        $(document).off('.mario');
        $(window).off('.mario');
    },
    setTouchAction: function(action, status) {
        if (!status) {
            keys.touchState[action] = false;
            keys.syncAction(action);
            return;
        }
        if (!keys.enabled) {
            return;
        }
        var wasUp = keys.up;
        keys.touchState[action] = true;
        keys.syncAction(action);
        if (action === 'up' && !wasUp) {
            keys.jumpQueued = true;
        }
    },
    handler: function(event, status) {
        if (!keys.enabled) {
            return true;
        }

        var action = null;
        switch (event.keyCode) {
            case 57392:
            case 17:
            case 16:
            case 65:
                action = 'accelerate';
                break;
            case 40:
                action = 'down';
                break;
            case 39:
                action = 'right';
                break;
            case 37:
                action = 'left';
                break;
            case 38:
            case 32:
                action = 'up';
                break;
            default:
                return true;
        }

        var wasUp = keys.up;
        keys.keyboardState[action] = status;
        keys.syncAction(action);
        if (action === 'up' && status && !wasUp) {
            keys.jumpQueued = true;
        }

        event.preventDefault();
        return false;
    },
    onReset: null,
    enabled: true,
    accelerate: false,
    left: false,
    up: false,
    jumpQueued: false,
    right: false,
    down: false,
    keyboardState: {
        accelerate: false,
        left: false,
        up: false,
        right: false,
        down: false,
    },
    touchState: {
        accelerate: false,
        left: false,
        up: false,
        right: false,
        down: false,
    },
};

keys.bind();

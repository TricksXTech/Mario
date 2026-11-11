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
    reset: function() {
        keys.left = false;
        keys.right = false;
        keys.accelerate = false;
        keys.up = false;
        keys.jumpQueued = false;
        keys.down = false;
    },
    unbind: function() {
        $(document).off('.mario');
        $(window).off('.mario');
    },
    handler: function(event, status) {
        if (!keys.enabled) {
            return true;
        }

        switch (event.keyCode) {
            case 57392:
            case 17:
            case 16:
            case 65:
                keys.accelerate = status;
                break;
            case 40:
                keys.down = status;
                break;
            case 39:
                keys.right = status;
                break;
            case 37:
                keys.left = status;
                break;
            case 38:
            case 32:
                if (status && !keys.up) {
                    keys.jumpQueued = true;
                }
                keys.up = status;
                break;
            default:
                return true;
        }

        event.preventDefault();
        return false;
    },
    enabled: true,
    accelerate: false,
    left: false,
    up: false,
    jumpQueued: false,
    right: false,
    down: false,
};

keys.bind();

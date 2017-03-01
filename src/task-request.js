const _ = require("lodash");
const request = require("request");

/**
 * Request task module
 */
class Module {

    /**
     * @param plugin
     */
    constructor(plugin) {
        this.plugin = plugin;
    }

    /**
     * Make a request to the uri and pass the result.
     * @param options
     * @param done
     */
    run(options, done) {
        let self = this;
        // options.request is required and of type json so we should not have to test it before
        let requestData = options.request;
        requestData = _.merge({
            method: "GET"
        }, requestData);

        // filters
        requestData.method = requestData.method.toUpperCase();

        request(requestData, function(err, response, body) {
            if (err) {
                self.plugin.helper.logger.verbose("Error on request", err.message);
                return done(err);
            }
            self.plugin.helper.logger.verbose("Success on request to %s", requestData.uri);
            return done(body);
        });
    }
}

module.exports = Module;
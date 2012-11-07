(function () {
    "use strict";
    var it = require("it"), comb = require("comb"), assert = require("assert"), nools = require("../index");

    var TestObject = function () {
    };

    var cb = function () {
    };

    it.describe("Session", function (it) {
        
        it.describe("#skip", function (it) {
                
            it.should("create for string", function (next) {
                
                var Message = function (message) {
                    this.message = message;
                };
                var Result = function () {
                    
                    var _messages = [];
                    
                    this.add = function(message) {
                        _messages.push(message);
                    };
                    
                    this.has = function(message) {
                        return (_messages.indexOf(message) > -1);
                    };
                    
                };

                var flow = nools.flow("Hello World", function (flow) {

                    //find any message that start with hello
                    this.rule("Rule 1", [
                            [Message, "msg"],
                            [Result, "rslt"]
                        ], function (facts) {
                            facts.rslt.add(facts.msg);
                        }
                    );
                });
                
                var session = flow.getSession();
                //assert your different messages
                
                var msg1 = new Message("msg1");
                var msg2 = new Message("msg2");
                var msg3 = new Message("msg3");
                var result = new Result();
                
                session.assert(msg1);
                session.assert(msg2);
                session.assert(msg3);
                session.assert(result);
                
                session.retract(msg2);


                //now fire the rules
                session.match(function(err){
                    if(err) {
                        throw err;
                    } else {
                        assert.isTrue(result.has(msg1));
                        assert.isFalse(result.has(msg2));
                        assert.isTrue(result.has(msg3));
                    }
                    
                    session.modify(msg2);
                    
                    session.match(function(err){
                        if(err) {
                            throw err;
                        } else {
                            assert.isTrue(result.has(msg2));
                            next();
                        }
                    })
                })
                
            });

        });

    }).as(module);
})();
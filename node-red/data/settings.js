/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

// const fs = require('fs');
const bcrypt = require('bcryptjs')

function parseAuth(authSequences) {
    return authSequences.split(' ').map(s => s.trim()).map(userPassPerms => {
        const splitted = userPassPerms.split(',')

        const username = splitted[0]
        const password = bcrypt.hashSync(splitted[1], 8)

        if (splitted.length === 2) {
            return {
                user: username,
                pass: password,
            }
        } else {
            return {
                username,
                password,
                permissions: splitted[2],
            }
        }
    })
}

module.exports = {
    // the tcp port that the Node-RED web server is listening on
    uiPort: process.env.PORT || 1880,

    // Retry time in milliseconds for MQTT connections
    mqttReconnectTime: 15000,

    // Retry time in milliseconds for Serial port connections
    serialReconnectTime: 15000,

    // The maximum length, in characters, of any message sent to the debug sidebar tab
    debugMaxLength: 1000,

    // To disable the option for using local files for storing keys and certificates in the TLS configuration
    //  node, set this to true
    //tlsConfigDisableLocalFiles: true,

    // By default, credentials are encrypted in storage using a generated key. To
    // specify your own secret, set the following property.
    // If you want to disable encryption of credentials, set this property to false.
    // Note: once you set this property, do not change it - doing so will prevent
    // node-red from being able to decrypt your existing credentials and they will be
    // lost.
    credentialSecret: process.env.NODE_RED_CREDENTIALS_SECRET || false,

    // Securing Node-RED
    // -----------------
    // To password protect the Node-RED editor and admin API, the following
    // property can be used. See http://nodered.org/docs/security.html for details.
    adminAuth: {
       type: "credentials",
       users: parseAuth(process.env.NODE_RED_ADMIN_AUTH),
    },

    // To password protect the node-defined HTTP endpoints (httpNodeRoot), or
    // the static content (httpStatic), the following properties can be used.
    // The pass field is a bcrypt hash of the password.
    // See http://nodered.org/docs/security.html#generating-the-password-hash
    httpNodeAuth: parseAuth(process.env.NODE_RED_NODE_AUTH)[0],
    httpStaticAuth: parseAuth(process.env.NODE_RED_STATIC_AUTH)[0],

    // The following property can be used to enable HTTPS
    // See http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
    // for details on its contents.
    // See the comment at the top of this file on how to load the `fs` module used by
    // this setting.
    //
    //https: {
    //    key: fs.readFileSync('privatekey.pem'),
    //    cert: fs.readFileSync('certificate.pem')
    //},

    // The following property can be used to cause insecure HTTP connections to
    // be redirected to HTTPS.
    //requireHttps: true,

    // The following property can be used to seed Global Context with predefined
    // values. This allows extra node modules to be made available with the
    // Function node.
    // For example,
    //    functionGlobalContext: { os:require('os') }
    // can be accessed in a function block as:
    //    global.get("os")
    functionGlobalContext: {
        // os:require('os'),
        // jfive:require("johnny-five"),
        // j5board:require("johnny-five").Board({repl:false})
    },
    // `global.keys()` returns a list of all properties set in global context.
    // This allows them to be displayed in the Context Sidebar within the editor.
    // In some circumstances it is not desirable to expose them to the editor. The
    // following property can be used to hide any property set in `functionGlobalContext`
    // from being list by `global.keys()`.
    // By default, the property is set to false to avoid accidental exposure of
    // their values. Setting this to true will cause the keys to be listed.
    exportGlobalContextKeys: false,

    // Configure the logging output
    logging: {
        // Only console logging is currently supported
        console: {
            // Level of logging to be recorded. Options are:
            // fatal - only those errors which make the application unusable should be recorded
            // error - record errors which are deemed fatal for a particular request + fatal errors
            // warn - record problems which are non fatal + errors + fatal errors
            // info - record information about the general running of the application + warn + error + fatal errors
            // debug - record information which is more verbose than info + info + warn + error + fatal errors
            // trace - record very detailed logging + debug + info + warn + error + fatal errors
            // off - turn off all logging (doesn't affect metrics or audit)
            level: "info",
            // Whether or not to include metric events in the log output
            metrics: false,
            // Whether or not to include audit events in the log output
            audit: false
        }
    },

    // Customising the editor
    editorTheme: {
        projects: {
            // To enable the Projects feature, set this value to true
            enabled: false
        }
    },
}

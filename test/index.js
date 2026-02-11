const assert = require('node:assert/strict')
const { beforeEach, describe, it } = require('node:test')

// npm modules
const fixtures = require('haraka-test-fixtures')
const plugin_module = require('../index.js')

// start of tests
//    assert: https://nodejs.org/api/assert.html

let plugin
let connection

beforeEach(() => {
  plugin = new fixtures.plugin('template')
  
  Object.assign(plugin, plugin_module)
})

describe('register', () => {
  it('has a register function', () => {
    assert.equal('function', typeof plugin.register)
  })

  it('registers', () => {
    const expected_cfg = {
      main: {
        disabled: false,
        enabled: true,
      },
      feature_section: {
        yes: true
      }
    }

    assert.deepEqual(plugin.cfg, undefined)
    plugin.register()
    assert.deepEqual(plugin.cfg, expected_cfg)
  })
})

describe('load_template_ini', () => {
  it('loads', () => {
    assert.equal('object', typeof plugin)
    assert.equal('template', plugin.name)
  })

  it('loads template.ini from config/template.ini', () => {
    plugin.load_template_ini()
    assert.ok(plugin.cfg)
  })

  it('initializes enabled boolean', () => {
    plugin.load_template_ini()
    assert.equal(plugin.cfg.main.enabled, true, plugin.cfg)
  })
})

describe('uses text fixtures', () => {
  it('sets up a connection', () => {
    connection = fixtures.connection.createConnection({})
    assert.ok(connection.server)
  })

  it('sets up a transaction', () => {
    connection = fixtures.connection.createConnection({})
    connection.init_transaction()
    assert.ok(connection.transaction.header)
  })
})

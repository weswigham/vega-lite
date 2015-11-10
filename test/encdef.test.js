'use strict';

var consts = require('../src/consts');
var expect = require('chai').expect;
var vlEncDef = require('../src/encdef');

var Q = consts.Type.Q;
var O = consts.Type.O;
var N = consts.Type.N;

describe('vl.encDef.cardinality()', function () {
  describe('for Q', function () {
    it('should return cardinality', function() {
      var encDef = {name:2, type:'Q'};
      var stats = {2:{distinct: 10, min:0, max:150}};
      var cardinality = vlEncDef.cardinality(encDef, stats);
      expect(cardinality).to.equal(10);
    });
  });

  describe('for B(Q)', function(){
    it('should return cardinality', function() {
      var encDef = {name:2, type:'Q', bin: {maxbins: 15}};
      var stats = {2:{distinct: 10, min:0, max:150}};
      var cardinality = vlEncDef.cardinality(encDef, stats);
      expect(cardinality).to.equal(15);
    });
  });
});

describe('vl.encDef.isType', function () {
  it('should return correct type checking', function() {
    var qDef = {name: 'number', type:'Q'};
    expect(vlEncDef.isType(qDef, Q)).to.eql(true);
    expect(vlEncDef.isTypes(qDef, N)).to.eql(false);
  });
});

describe('vl.encDef.isTypes', function () {
  it('should return correct type checking', function() {
    var qDef = {name: 'number', type:'Q'};
    expect(vlEncDef.isType(qDef, Q)).to.eql(true);
    expect(vlEncDef.isTypes(qDef, [Q])).to.eql(true);
    expect(vlEncDef.isTypes(qDef, [Q, O])).to.eql(true);
    expect(vlEncDef.isTypes(qDef, [O, Q])).to.eql(true);
    expect(vlEncDef.isTypes(qDef, [Q, N])).to.eql(true);
    expect(vlEncDef.isTypes(qDef, [N])).to.eql(false);
  });
});

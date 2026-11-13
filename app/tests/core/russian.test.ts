import assert from 'node:assert/strict';
import {test} from 'node:test';
import {L, pickL} from '../../src/data/taxonomy';
import {t} from '../../src/lib/i18n';
import {SCENARIOS, THEORIES} from '../../src/data/corpus';
import {LocalizedSchema} from '../../src/lib/runtime-contracts';

test('Russian reads its own text and falls back to English when none exists',()=>{
  assert.equal(pickL(L('中','En','Ру'),'ru'),'Ру');
  assert.equal(pickL(L('中','En'),'ru'),'En');
  assert.equal(pickL(L('中','En'),'zh'),'中');
  assert.equal(t('ru','pr_step_talk'),t('en','pr_step_talk'));
});

test('localized schema keeps the Russian field instead of stripping it',()=>{
  assert.deepEqual(LocalizedSchema.parse({zh:'a',en:'b',ru:'c'}),{zh:'a',en:'b',ru:'c'});
});

test('elicitation scenes and techniques are present with Russian text',()=>{
  const scenes=SCENARIOS.filter(s=>s.id.startsWith('elicit-'));
  assert.equal(scenes.length,5);
  for(const s of scenes){assert.ok(s.title.ru&&s.background.ru&&s.opening.text.ru,s.id);assert.ok(s.characters.some(c=>c.hidden?.ru),s.id);}
  assert.equal(THEORIES.filter(x=>x.id.startsWith('elicit-')).length,17);
});

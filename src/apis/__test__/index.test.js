import { getCommasSeperatedIDsStringFromVideoItems } from '../index'
import { RDOFakeData } from '../fakeData'
import { ExpansionPanelActions } from '@material-ui/core'


test('can get correct IDs string', () => {

  const result = getCommasSeperatedIDsStringFromVideoItems(RDOFakeData.items)
  expect(result).toEqual('DmGnzUejYAk,VSgNtdrtotg,u0gB_vOxdj4,-itMhWW2qjY,dnf4AEADY30,WwUh0rl6AZs,4-l4lrHuauo,oIiET1SdQNE,GRzTGoh4hSI,f5XeDuO71sE,ndQSFA0syLQ,')

})

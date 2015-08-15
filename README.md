# pedigree
家谱管理系统基础库。

## Roadmap

### 1.0
	- 最基本的家族成员管理，包括：
		- `PersonManager`, 继承自 `ConceptManager`
			- `addNew`
			- `get`
			- `fromConcept`
		- `Person` 继承自 `Concept`
			- `addFather`
			- `removeMother`
			- `addMother`
			- `removeMother`
			- `addCouple`
			- `removeCouple`
			- `detail`
			- `ancestors` 获取Person的所有父系祖先
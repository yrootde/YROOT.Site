<?php
namespace YROOT\Site\Generators;
use Neos\Flow\Annotations as Flow;
use Neos\Neos\Domain\Service\DefaultPrototypeGeneratorInterface;
use Neos\ContentRepository\Domain\Model\NodeType;
/**
 * @Flow\Scope("singleton")
 */
class DefaultDocumentPrototypeGenerator implements DefaultPrototypeGeneratorInterface
{
    /**
     * Generate a Fusion prototype definition for a given node type
     *
     * @param NodeType $nodeType
     * @return string
     */
    public function generate(NodeType $nodeType)
    {
        if (strpos($nodeType->getName(), ':') === false) {
            return '';
        }
        $prototypeName = $nodeType->getName();
        $output = 'prototype(' . $prototypeName . ') < prototype(Neos.Neos:Document) {' . chr(10);
        $output .= '}' . chr(10);
        $output .= 'prototype(' . $prototypeName . '.Document) < prototype(Page) {' . chr(10);
        $output .= 'body = ' . $prototypeName . chr(10);
        $output .= '}' . chr(10);
        return $output;
    }
}

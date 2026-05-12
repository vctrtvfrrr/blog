<?php

/**
 * Config for PHP-CS-Fixer ver2
 */

$rules = [
    'psr0'                        => false,
    '@PSR2'                       => true,
    'array_syntax'                => ['syntax' => 'short'],
    'blank_line_after_namespace'  => true,
    'braces'                      => true,
    'class_definition'            => true,
    'concat_space'                => ['spacing' => 'one'],
    'elseif'                      => true,
    'encoding'                    => true,
    'full_opening_tag'            => true,
    'function_declaration'        => true,
    'increment_style'             => ['style' => 'post'],
    'indentation_type'            => true,
    'line_ending'                 => true,
    'linebreak_after_opening_tag' => true,
    'lowercase_constants'         => true,
    'lowercase_keywords'          => true,
    'mb_str_functions'            => true,
    'method_argument_space'       => ['ensure_fully_multiline' => true],
    'no_break_comment'            => true,
    'no_closing_tag'              => true,
    'no_multiline_whitespace_before_semicolons' => true,
    'no_php4_constructor'                   => true,
    'no_short_echo_tag'                     => true,
    'no_spaces_after_function_name'         => true,
    'no_spaces_inside_parenthesis'          => true,
    'no_unreachable_default_argument_value' => true,
    'no_unused_imports'                     => true,
    'no_useless_else'                       => true,
    'no_useless_return'                     => true,
    'not_operator_with_successor_space'     => true,
    'ordered_imports'                       => ['sortAlgorithm' => 'length'],
    'php_unit_strict'                       => true,
    'phpdoc_indent'                         => true,
    'phpdoc_order'                          => true,
    'single_blank_line_at_eof'              => true,
    'single_class_element_per_statement'    => ['elements' => ['property']],
    'single_import_per_statement'           => true,
    'single_line_after_imports'             => true,
    'strict_comparison'                     => true,
    'strict_param'                          => true,
    'switch_case_semicolon_to_colon'        => true,
    'switch_case_space'                     => true,
    'visibility_required'                   => true,
];

return PhpCsFixer\Config::create()
    ->setRules($rules)
    ->setRiskyAllowed(true)
    ->setFinder(
        PhpCsFixer\Finder::create()
            ->notPath('bootstrap/cache')
            ->notPath('node_modules')
            ->notPath('storage')
            ->notName('*.blade.php')
    );

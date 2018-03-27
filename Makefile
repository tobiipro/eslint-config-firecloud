ifeq (,$(wildcard support-firecloud/Makefile))
INSTALL_SUPPORT_FIRECLOUD := $(shell git submodule update --init --recursive support-firecloud)
ifneq (,$(filter undefine,$(.FEATURES)))
undefine INSTALL_SUPPORT_FIRECLOUD
endif
endif

include support-firecloud/repo/mk/js.common.node.mk
include support-firecloud/repo/mk/js.lint.eslint.mk
include support-firecloud/repo/mk/js.publish.npg.mk

# ------------------------------------------------------------------------------

JS_RULE_TEST_FILES := $(shell $(FIND_Q) test -type f -name "*.test.js" -print)

# ------------------------------------------------------------------------------

.PHONY: test
test: ## Test.
	@$(ECHO_DO) "Testing..."
	for f in $(JS_RULE_TEST_FILES); do \
		$(ECHO) Running $${f} ; \
		$(NODE) $${f} ; \
	done
	@$(ECHO_DONE)
